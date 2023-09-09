import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { StringToEnum } from 'src/core/swagger.decorator';
import { WorkingHoursEnum } from 'src/modules/salon/enums/working-hour.enum';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({
    allowNaN: false,
  })
  salon_service_id!: number;

  @IsNotEmpty()
  @ApiProperty({
    type: WorkingHoursEnum,
  })
  @StringToEnum(WorkingHoursEnum)
  time!: WorkingHoursEnum;
}
