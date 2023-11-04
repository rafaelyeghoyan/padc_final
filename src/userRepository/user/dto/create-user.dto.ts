import { IsString, Matches, Min } from 'class-validator';

export class CreateUserDto {
  @Min(3)
  @IsString()
  FirstName: string;
  @Min(3)
  @IsString()
  LastName: string;
  @Min(5)
  @IsString()
  UserName: string;
  @Min(12)
  @IsString()
  Phone: string;
  @IsString()
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i, {
    message: 'Invalid email format',
  })
  Email: string;
  @Min(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password length must be at least 8 characters. Password should contain at least one uppercase letter and one number.',
  })
  @IsString()
  Password: string;
}
