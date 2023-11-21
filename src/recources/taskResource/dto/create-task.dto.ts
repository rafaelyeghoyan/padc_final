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

  @IsDateFormat('MM/dd/yyyy', {
    message: 'Invalid Date Format',
  })
  @ApiProperty()
  dueDate: Date;
}
