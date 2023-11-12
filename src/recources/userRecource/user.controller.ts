import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginData } from './dto/login-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async registrationUser(@Body() dto: CreateUserDto) {
    return this.userService.registrationUser(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginData) {
    const loginedUser = await this.userService.loginUser(dto);
    if (loginedUser) {
      return loginedUser;
    }
    return 'The userRecource was not founded';
  }
}
