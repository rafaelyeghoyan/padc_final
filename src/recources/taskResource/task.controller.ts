import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Task API')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Post('create:id')
  async createTasks(@Body() dto: TaskDto, @Param('id') id: string) {
    const Id: number = Number(id.slice(1));
    return this.taskService.createTask(dto, Id);
  }

  @Delete('remove:id')
  async deleteTask(@Param('id') id: string) {
    const Id: number = Number(id.slice(1));
    return this.taskService.deleteTask(Id);
  }

  @Put('update/:id')
  async updateTask(@Param('id') id: string, @Body() dto: TaskDto) {
    const Id: number = Number(id.slice(1));
    return this.taskService.updateTask(Id, dto);
  }
}
