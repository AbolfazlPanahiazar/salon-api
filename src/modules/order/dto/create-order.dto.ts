import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { StringToEnum } from 'src/core/swagger.decorator';
import { WorkingHoursEnum } from 'src/modules/salon/enums/working-hour.enum';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  salon_service_id!: number;

  @IsNotEmpty()
  @ApiProperty()
  @StringToEnum(WorkingHoursEnum)
  time!: WorkingHoursEnum;
}
