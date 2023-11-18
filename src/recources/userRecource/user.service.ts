import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserData } from './dto/logined-user-data';
import { LoginData } from './dto/login-user-dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../../../output/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../output/entities/task.entity';
import * as process from 'process';
import { TaskService } from '../taskResource/task.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '../../../output/entities/user.entity';

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
  generateAccessToken(payload: any): string {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign(payload, secretKey);
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
        userData.accessToken = this.generateAccessToken(user.id);
        if (userData.role === UserRole.Admin) {
          userData.userTasks = await this.taskService.getTasks();
          userData.accessToken += '1';
        }
        if (userData.role === UserRole.User) {
          userData.userTasks = await this.taskService.getUserTasks(userData.id);
          userData.accessToken += '2';
        }
        return userData;
      }
    }
    throw new ConflictException('The email or password is incorrect');
  }

  async getUserTaskCount(id: number) {
    const userTasks: Task[] = [];
    await this.taskService.getTasks().then((item: Task[]) => {
      item.forEach((tasksInfo: Task) => {
        if (tasksInfo.userId === id && tasksInfo.isActive === true) {
          userTasks.push(tasksInfo);
        }
      });
    });
    return {
      user_id: id,
      task_cunt: userTasks.length,
    };
  }
}
