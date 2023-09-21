import { PartialType } from '@nestjs/swagger';
import { CreateSalonServiceDto } from './create-salon-service.dto';

export class UpdateSalonServiceDto extends PartialType(CreateSalonServiceDto) {}
