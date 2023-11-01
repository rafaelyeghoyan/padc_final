import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginData } from './dto/login-user-dto';
import { TaskDto } from './dto/task-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      return loginedUser;
    }
    return 'The user was not founded';
  }
  @Get('tasks')
  async getTasks() {
    return await this.userService.getTask();
  }

  @Post('tasks')
  async createTasks(@Body() dto: TaskDto) {
    return await this.userService.createTask(dto);
  }

}
