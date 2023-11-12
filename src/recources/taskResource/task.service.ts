import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../output/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../../../output/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTasks() {
    return await this.taskRepository.findBy({ isActive: true });
  }

  async createTask(dto: TaskDto, id: number) {
    const user: User[] = await this.userRepository.findBy({ id: id });
    if (user) {
      dto.userId = user[0].id;
      return this.taskRepository.create(dto);
    }
    return 'userRecource was not logined';
  }

  async deleteTask(id: number) {
    const deletedTask: Task[] = await this.taskRepository.findBy({ id: id });
    deletedTask[0].isActive = false;
    await this.taskRepository.save(deletedTask);
    return 'Task has been successfully deleted';
  }

  async updateTas(id: number, dto: UpdateTaskDto) {
    return this.taskRepository.update(id, dto);

    // const updatedTask: Task = await this.taskRepository.findOne({
    //   where: { id: id },
    // });
    //
    // if (updatedTask) {
    //   updatedTask.content = dto.content;
    //   updatedTask.dueDate = dto.dueDate;
    //   updatedTask.title = dto.title;
    //
    //   return await this.taskRepository.save(updatedTask); // Save the updated taskResource
    // } else {
    //   // If the taskResource doesn't exist
    //   throw new Error('Task not found');
    // }
  }

  async getUserTasks(userId: number) {
    return await this.taskRepository.findBy({ userId: userId, isActive: true });
  }
}
