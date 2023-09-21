import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/dtos/pagination.dto';

@Controller('service')
@ApiTags(ServiceController.name)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiResponse({ status: 201, type: ServiceEntity })
  @Post('/create-service')
  @AdminEndpoint()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @ApiResponse({ status: 200, type: ServiceEntity, isArray: true })
  @Get('/get-all-services')
  @PublicEndpoint()
  findAll(
    @Query() { limit, search, skip }: PaginationDto,
  ): Promise<{ count: number; services: ServiceEntity[] }> {
    return this.serviceService.findManyAndCount(limit, skip, search);
  }

  @ApiResponse({ status: 200, type: ServiceEntity })
  @Get('/get-service-by-id/:id')
  @PublicEndpoint()
  findOne(@Param('id') id: string): Promise<ServiceEntity> {
    return this.serviceService.findOne({ id: +id });
  }

  @ApiResponse({ status: 201, type: ServiceEntity })
  @Patch('/update-service/:id')
  @AdminEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceEntity> {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete('/delete-service/:id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.serviceService.remove(+id);
  }
}
