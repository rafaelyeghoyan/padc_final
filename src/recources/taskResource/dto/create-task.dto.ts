import { IsDate, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateFormat } from '../../../decorators';

export class TaskDto {
  @ApiProperty()
  @MinLength(5)
  @IsString()
  title: string;

  @ApiProperty()
  @MinLength(4)
  @IsString()
  content: string;

  @ApiProperty()
  @IsDateFormat('yyyy-mm-dd', {
    message: 'Invalid Date Format',
  })
  dueDate: Date;
}
