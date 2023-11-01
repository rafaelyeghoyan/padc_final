import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../DB/database/database.module';
import { userProviders } from './provider/user';
import { taskProviders } from './provider/task/task';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, ...taskProviders, UserService],
})
export class UserModule {}
