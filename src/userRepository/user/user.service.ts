import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserData } from './dto/logined-user-data';
import { LoginData } from './dto/login-user-dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../../../output/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../output/entities/task.entity';
import * as process from 'process';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async hashedPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword: string = bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async registrationUser(dto) {
    dto.Password = await this.hashedPassword(dto.Password);
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
  }

  generateAccessToken(payload: any): string {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign(payload, secretKey);
  }

  async loginUser(loginDto: LoginData) {
    if (!loginDto.Email && !loginDto.Password) {
      return null;
    }
    if (loginDto) {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.Email,
        },
      });
      if (user && (await bcrypt.compare(loginDto.Password, user.password))) {
        const userData: UserData = new UserData();
        userData.firstName = user.firstName;
        userData.lastName = user.lastName;
        userData.userName = user.userName;
        userData.phone = user.phone;
        userData.role = user.role;
        userData.id = user.id;
        userData.email = user.email;
        userData.accessToken = this.generateAccessToken(user.id);
        if (userData.role === 'admin') {
          userData.userTasks = await this.taskRepository.find();
        }
        if (userData.role === 'user') {
          const allTasks: Task[] = await this.taskRepository.findBy({
            userId: userData.id,
          });
          const actulatTasks = [];
          allTasks.forEach((item) => {
            if (item.isActive) {
              actulatTasks.push(item);
            }
          });
          userData.userTasks = actulatTasks;
        }
        return userData;
      }
    }
    return null;
  }

  async getUser() {
    return await this.userRepository.find();
  }
}
