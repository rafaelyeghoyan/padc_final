import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from '../../../output/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  imports: [Task, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, Task],
  exports: [Task],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TaskController);
  }
}
