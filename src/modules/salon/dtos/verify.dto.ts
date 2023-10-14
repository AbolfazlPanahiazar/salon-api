import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class VerifySalonDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}
