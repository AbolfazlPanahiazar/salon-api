import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WorkingHoursEnum } from '../enums/working-hour.enum';

export class CreateSalonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  video?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  map?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  start?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  end?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({ type: [Number], isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  serviceIds: number[];

  @ApiProperty({ enum: WorkingHoursEnum, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(WorkingHoursEnum, { each: true })
  workingHours: WorkingHoursEnum[];
}
