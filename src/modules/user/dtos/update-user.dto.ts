import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email!: string | null;

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
