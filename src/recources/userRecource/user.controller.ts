import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginData } from './dto/login-user-dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async registrationUser(@Body() dto: CreateUserDto) {
    return this.userService.registrationUser(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() dto: LoginData) {
    return this.userService.loginUser(dto);
  }
}
