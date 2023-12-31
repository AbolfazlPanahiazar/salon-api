import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';

export class QueryAllSalonsDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}
