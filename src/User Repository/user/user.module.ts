import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../DB/database/database.module';
import { userProviders } from './provider/user';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
})
export class UserModule {}
