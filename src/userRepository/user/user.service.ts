import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserData } from './dto/logined-user-data';
import { LoginData } from './dto/login-user-dto';
import * as jwt from 'jsonwebtoken';
import { User } from '../../../output/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const secretKey =
      '00228eaad7bd7ead49b4a66f5ea4681146e970ec008d0b4dcaeccf36432599db';
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
        return userData;
      }
    }
    return null;
  }

  async getUser() {
    return await this.userRepository.find();
  }
}
