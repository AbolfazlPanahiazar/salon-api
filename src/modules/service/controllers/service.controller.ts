import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import {
  AdminEndpoint,
  PublicEndpoint,
  SalonOwnerEndpoint,
} from 'src/core/swagger.decorator';
import { ServiceEntity } from '../entities/service.entity';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('service')
@ApiTags(ServiceController.name)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @SalonOwnerEndpoint()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @PublicEndpoint()
  findAll(): Promise<ServiceEntity[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @SalonOwnerEndpoint()
  findOne(@Param('id') id: string): Promise<ServiceEntity> {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @SalonOwnerEndpoint()
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.serviceService.remove(+id);
  }
}
