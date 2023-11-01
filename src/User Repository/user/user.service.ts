import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserData } from './dto/logined-user-data';
import { LoginData } from './dto/login-user-dto';
import process from 'process';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async hashedPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword: string = bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async registrationUser(dto: CreateUserDto) {
    dto.Password = await this.hashedPassword(dto.Password);
    const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
  }
  generateAccessToken(payload: any): string {
    const secretKey = "00228eaad7bd7ead49b4a66f5ea4681146e970ec008d0b4dcaeccf36432599db";
    return jwt.sign(payload, secretKey);
  }

  async loginUser(loginDto: LoginData) {
    if (!loginDto.Email && !loginDto.Password) {
      return null;
    }
    if (loginDto) {
      const user = await this.userRepository.findOne({
        where: {
          Email: loginDto.Email,
        },
      });
      if (user && (await bcrypt.compare(loginDto.Password, user.Password))) {
        const userData: UserData = new UserData();
        userData.firstName = user.FirstName;
        userData.lastName = user.LastName;
        userData.userName = user.UserName;
        userData.phone = user.Phone;
        userData.role = user.Role;
        userData.id = user.Id;
        userData.email = user.Email;
        userData.accessToken = this.generateAccessToken(user.Id);
        return userData;
      }
    }
    return null;
  }
}
