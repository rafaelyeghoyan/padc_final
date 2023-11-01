import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginData } from './dto/login-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getAllUsers() {
    const data = await this.userService.findAll();
    console.log(data);
  }

  @Post('registration')
  async registrationUser(@Body() dto: CreateUserDto) {
    const data = await this.userService.registrationUser(dto);
    if (data) {
      return 'User was successfully created';
    }
    return 'The user data is incorrect';
  }

  @Post('login')
  async loginUser(@Body() dto: LoginData) {
    const loginedUser = await this.userService.loginUser(dto);
    if (loginedUser) {
      console.log(loginedUser);
      return loginedUser;
    }
    return 'The user was not founded';
  }
}
