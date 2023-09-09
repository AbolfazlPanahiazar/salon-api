import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  file!: string;
}
