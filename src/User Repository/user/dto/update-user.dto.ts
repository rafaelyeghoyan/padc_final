import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  FirstName: string;

  @IsString()
  LastName: string;

  @IsString()
  UserName: string;

  @IsString()
  Phone: string;

  @IsString()
  Email: string;

  @IsString()
  Password: string;
}
