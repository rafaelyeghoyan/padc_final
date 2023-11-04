import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Post('tasks')
  async createTasks(@Body() dto: TaskDto) {
    return await this.taskService.createTask(dto);
  }
}
