import { BadRequestException, Injectable } from '@nestjs/common';
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
import { validate } from 'class-validator';

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

  async registrationUser(dto) {
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
      return null;
    }
    if (loginDto) {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.email,
        },
      });
      if (user && (await bcrypt.compare(loginDto.password, user.password))) {
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
          userData.userTasks = await this.taskService.getTasks();
        }
        if (userData.role === 'user') {
          userData.userTasks = await this.taskService.getUserTasks(userData.id);
        }
        return userData;
      }
    }
    return null;
  }

  async getUser() {
    return await this.userRepository.find();
  }

  async getUserTaskCount(id: number) {
    const userTasks: Task[] = [];
    await this.taskService.getTasks().then((item) => {
      item.forEach((tasksInfo) => {
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
