import { IsString } from 'class-validator';

export class CreateUserDto {
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
