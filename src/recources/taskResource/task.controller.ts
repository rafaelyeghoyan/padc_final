import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Request
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterTaskDto } from './dto/filter-task.dto';
import { AuthUser } from '../../decorators';
@ApiTags('Task API')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Post('create')
  async createTasks(@Body() dto: TaskDto, @Param('id') id: string, @AuthUser() user) {
    const Id: number = Number(user.id);
    return this.taskService.createTask(dto, Id);
  }

  @Post('search')
  async filterTask(@Body() dto: FilterTaskDto) {
    return this.taskService.filterTask(dto);
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
