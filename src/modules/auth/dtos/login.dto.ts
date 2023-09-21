import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Email address is invalid' })
  @Transform((v) => v.value.toString().toLowerCase())
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
