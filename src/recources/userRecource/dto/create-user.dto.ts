import { IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @MinLength(3)
  @IsString()
  lastName: string;

  @MinLength(5)
  @IsString()
  userName: string;

  @MinLength(9)
  @IsString()
  phone: string;

  @IsString()
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i, {
    message: 'Invalid email format',
  })
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password length must be at least 8 characters. Password should contain at least one uppercase letter and one number.',
  })
  @IsString()
  password: string;
}
