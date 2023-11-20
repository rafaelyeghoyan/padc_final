import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches } from 'class-validator';

export class FilterTaskDto {

  @ApiProperty()
  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'The date format is incorrect. Please correct it to DD-MM-YYYY',
  })
  dueDate?: string;
  @ApiProperty()
  @IsBoolean()
  isActive?: boolean;
}
