import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Email address is invalid' })
  @Transform((v) => v.value.toString().toLowerCase())
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
