import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './DB/database/database.module';
import { UserModule } from './User Repository/user/user.module';
import { UserService } from './User Repository/user/user.service';
import { UserController } from './User Repository/user/user.controller';
import { userProviders } from './User Repository/user/provider/user';
@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, ...userProviders],
})
export class AppModule {}
