import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Post('create:id')
  async createTasks(@Body() dto: TaskDto, @Param('id') id: string) {
    const Id: number = Number(id.slice(1));
    return await this.taskService.createTask(dto, Id);
  }

  @Post('remove:id')
  async deleteTask(@Param('id') id: string) {
    const Id: number = Number(id.slice(1));
    return await this.taskService.deleteTask(Id);
  }

  @Put('update:id')
  async updateTask(@Param('id') id: string, @Body() dto: TaskDto) {
    const Id: number = Number(id.slice(1));
    this.taskService.updateTas(Id, dto);
  }
}
