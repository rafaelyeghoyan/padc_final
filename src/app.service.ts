import { Injectable } from '@nestjs/common';
import { UserService } from './User Repository/user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async getUsers() {
    return await this.userService.findAll();
  }
}
