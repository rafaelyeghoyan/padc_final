import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './userRepository/user/user.module';
import { UserService } from './userRepository/user/user.service';
import { UserController } from './userRepository/user/user.controller';
import { TaskModule } from './taskRepository/task/task.module';
import { TaskService } from './taskRepository/task/task.service';
import { TaskController } from './taskRepository/task/task.controller';
import { User } from '../output/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../output/entities/task.entity';
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
  ],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService, UserService, TaskService],
})
export class AppModule {}
