import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../output/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../../../output/entities/user.entity';
import { FilterTaskDto } from './dto/filter-task.dto';
import { log } from 'console';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async getTasks() {
    return await this.taskRepository.findBy({ isActive: true });
  }

  async createTask(dto: TaskDto, user) {
      dto['userId'] = user.id;
      const creatTask: Task = await this.taskRepository.create(dto);
      return this.taskRepository.save(creatTask);
  }

  async deleteTask(id: number) {
    const deletedTask: Task = await this.taskRepository.findOneBy({ id: id });
    deletedTask.isActive = false;
    await this.taskRepository.save(deletedTask);
    return { statusCode: 200 };
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    return this.taskRepository.update(id, dto);
  }

  async getUserTasks(userId: number) {
    return await this.taskRepository.findBy({ userId: userId, isActive: true });
  }

  async filterTask(dto: FilterTaskDto) {
    if (dto.dueDate) {
      const filterTask: Task[] = await this.taskRepository.findBy({
        dueDate: dto.dueDate,
      });
      return filterTask;
    }
    if (dto.isActive) {
      const filterTask: Task[] = await this.taskRepository.findBy({
        isActive: dto.isActive,
      });
      return filterTask;
    }
    throw new ConflictException('data is empty');
  }
}
