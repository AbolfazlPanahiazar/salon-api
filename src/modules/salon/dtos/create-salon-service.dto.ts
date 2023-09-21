import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WorkingHoursEnum } from '../enums/working-hour.enum';

export class CreateSalonServiceDto {
  @Transform(({ value }) =>
    value.map((hour: WorkingHoursEnum) => WorkingHoursEnum[hour]),
  )
  @IsNotEmpty()
  @IsEnum(WorkingHoursEnum, { each: true })
  @IsArray()
  availableHours?: WorkingHoursEnum[];

  @Transform(({ value }) =>
    value.map((hour: WorkingHoursEnum) => WorkingHoursEnum[hour]),
  )
  @IsOptional()
  @IsEnum(WorkingHoursEnum, { each: true })
  @IsArray()
  reservedHours?: WorkingHoursEnum[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  reserveAt?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  service_id?: number;
}
