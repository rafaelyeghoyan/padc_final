import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../../../output/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async getTasks() {
    return await this.taskRepository.find();
  }

  async createTask(dto: TaskDto) {
    return this.taskRepository.create(dto);
  }
}
