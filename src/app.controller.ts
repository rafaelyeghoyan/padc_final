import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './User Repository/user/user.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  async getUsers() {
    const data = await this.appService.getUsers();
    console.log(data);
  }
  @Post('regist')
  registretionUser(@Body() dto) {
    console.log(dto);
  }
  @Post('login')
  loginUser(@Body() dto, @Res() res: Response) {
    console.log(res.status);
  }
}
