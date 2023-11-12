import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './recources/userRecource/user.module';
import { UserService } from './recources/userRecource/user.service';
import { UserController } from './recources/userRecource/user.controller';
import { TaskModule } from './recources/taskResource/task.module';
import { TaskService } from './recources/taskResource/task.service';
import { TaskController } from './recources/taskResource/task.controller';
import { User } from '../output/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../output/entities/task.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    Task,
    User,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'padc_final',
      entities: [User, Task],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Task]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService, UserService, TaskService],
})
export class AppModule {}
