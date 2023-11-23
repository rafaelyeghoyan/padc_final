import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginData {
  @ApiProperty()
  @IsString()
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i, {
    message: 'Invalid email format',
  })
  email: string;
  @ApiProperty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password length must be at least 8 characters. Password should contain at least one uppercase letter and one number.',
  })
  @IsString()
  password: string;
}
