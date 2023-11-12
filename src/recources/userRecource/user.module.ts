import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../../output/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { Task } from '../../../output/entities/task.entity';
import { TaskModule } from '../taskResource/task.module';
@Module({
  imports: [TypeOrmModule.forFeature([User, Task]), TaskModule],
  controllers: [UserController],
  providers: [UserService, User, Task],
  exports: [User],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
