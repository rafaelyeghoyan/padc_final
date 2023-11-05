import { IsString, Matches, Min } from 'class-validator';

export class LoginData {
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
