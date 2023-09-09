import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsEnum } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'skip',
  })
  @IsOptional()
  @Transform((v) => Math.abs(+v.value))
  @IsNumber({
    allowNaN: false,
  })
  skip?: number;

  @ApiPropertyOptional({
    description: 'limit',
  })
  @IsOptional()
  @Transform((v) => {
    const value = Math.abs(+v.value);

    return value <= 1000 ? value : 1000;
  })
  @IsNumber({
    allowNaN: false,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: 'search',
  })
  @IsOptional()
  @IsString()
  @Transform((v) => v.value.toLowerCase().trim())
  search?: string;
}
