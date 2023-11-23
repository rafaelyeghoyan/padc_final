import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches } from 'class-validator';
import { IsDateFormat } from '../../../decorators';

export class FilterTaskDto {

  @ApiProperty()
  @IsString()
  @IsDateFormat('yyyy-mm-dd', {
    message: 'Invalid Date Format',
  })
  dueDate?: Date;
  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;
}
