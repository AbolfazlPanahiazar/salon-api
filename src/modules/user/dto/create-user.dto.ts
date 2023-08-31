import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email!: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image!: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName!: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName!: string | null;
}
