import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { WorkingHoursEnum } from 'src/modules/salon/enums/working-hour.enum';
import { OrderStatus } from '../enums/order-status.enum';

export class CreateOrderDto {
  @ApiProperty({ description: 'Salon ID' })
  @IsNotEmpty()
  @IsNumber()
  salon_id: number;

  @ApiProperty({
    description: 'Reserved Hour',
    enum: WorkingHoursEnum,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(WorkingHoursEnum)
  reservedHour: WorkingHoursEnum | null;

  @ApiProperty({ description: 'Price', nullable: true })
  @IsOptional()
  @IsNumber()
  price: number | null;

  @ApiProperty({ description: 'Service IDs', type: [Number], isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  serviceIds: number[];

  @ApiProperty({
    description: 'Reserved Hour',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  time: Date;
}
