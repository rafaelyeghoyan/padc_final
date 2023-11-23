import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserData } from './dto/logined-user-data';
import { LoginData } from './dto/login-user-dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../../../output/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as process from 'process';
import { TaskService } from '../taskResource/task.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '../../../output/entities/user.entity';
import { Request} from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly taskService: TaskService,
  ) {}

  async hashedPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword: string = bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async registrationUser(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (existingUser && existingUser.isActive) {
      throw new ConflictException('User with this email already exists');
    }
    const existingUser2 = await this.userRepository.findOneBy({
      userName: dto.userName,
    });
    if (existingUser2 && existingUser.isActive) {
      throw new ConflictException('User with this user name already exists');
    }
    dto.password = await this.hashedPassword(dto.password);
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
  }
  generateAccessToken(payload: {id: number, role: string, userName: string}): string {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });
    return token;
  }
  async getUserTasks(role: string, id?:number){
    if(role === UserRole.Admin){
      return this.taskService.getTasks()
    }
    if(role === UserRole.User && id){
      return this.taskService.getUserTasks(id)
    }
  }

  async loginUser(loginDto: LoginData) {
    if (!loginDto.email && !loginDto.password) {
      throw new ConflictException('The email and password is required');
    }
    if (loginDto) {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.email,
        },
      });
      if (
        user &&
        (await bcrypt.compare(loginDto.password, user.password)) &&
        user.isActive
      ) {
        const userData: UserData = new UserData();
        userData.firstName = user.firstName;
        userData.lastName = user.lastName;
        userData.userName = user.userName;
        userData.phone = user.phone;
        userData.role = user.role;
        userData.id = user.id;
        userData.email = user.email;
        userData.accessToken = this.generateAccessToken({ id: user.id, role: user.role, userName: user.userName});
        userData.userTasks = await this.getUserTasks(userData.role, userData.id)
        return userData;
      }
    }
    throw new ConflictException('The email or password is incorrect');
  }
}
