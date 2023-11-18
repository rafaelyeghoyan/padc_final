import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  @MinLength(5)
  @IsString()
  title: string;
  @ApiProperty()
  @MinLength(4)
  @IsString()
  content: string;
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'The date format is incorrect please correct it DD-MM-YYYY',
  })
  @MinLength(10) // Replace to IsDate //
  @ApiProperty()
  dueDate: string;

}
