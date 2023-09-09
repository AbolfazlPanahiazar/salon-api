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
import { SalonService } from './services/salon.service';
import { CreateSalonDto } from './dto/create-salon.dto';
import { UpdateSalonDto } from './dto/update-salon.dto';
import {
  AdminEndpoint,
  PublicEndpoint,
  SalonOwnerEndpoint,
} from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { SalonEntity } from './entities/salon.entity';
import { SalonServiceService } from './services/salon-service.service';
import { CreateSalonServiceDto } from './dto/create-salon-service.dto';
import { DeleteResult, InsertResult } from 'typeorm';
import { UpdateSalonServiceDto } from './dto/update-salon-service.dto';
import { SalonServicesEntity } from './entities/salon-service.entity';
import { QueryAllSalonsDto } from './dto/query-all-salons.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('salon')
@ApiTags(SalonController.name)
export class SalonController {
  constructor(
    private readonly salonService: SalonService,
    private readonly salonServiceService: SalonServiceService,
  ) {}

  @Post()
  @SalonOwnerEndpoint()
  create(
    @Body() createSalonDto: CreateSalonDto,
    @User() user: UserEntity,
  ): Promise<InsertResult> {
    return this.salonService.create({ ...createSalonDto, owner_id: user.id });
  }

  @Patch(':id')
  @SalonOwnerEndpoint()
  update(@Param('id') id: string, @Body() updateSalonDto: UpdateSalonDto) {
    return this.salonService.update(+id, updateSalonDto);
  }

  @Get('/mine')
  @SalonOwnerEndpoint()
  findMine(@User() user: UserEntity): Promise<SalonEntity> {
    return this.salonService.findByOwnerId(user.id);
  }

  @Get()
  @PublicEndpoint()
  findAll(
    @Query() { limit, search, skip }: QueryAllSalonsDto,
  ): Promise<{ salons: SalonEntity[]; count: number }> {
    return this.salonService.findManyAndCount(limit, skip, search);
  }

  @Get(':id')
  @PublicEndpoint()
  findOne(@Param('id') id: string): Promise<SalonEntity> {
    return this.salonService.findOne(+id);
  }

  @Delete(':id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.salonService.remove(+id);
  }

  //

  @Post('/salon-service')
  @SalonOwnerEndpoint()
  createSalonService(
    @Body() createSalonServiceDto: CreateSalonServiceDto,
    @User() user: UserEntity,
  ): Promise<InsertResult> {
    return this.salonServiceService.create({
      salon_id: user.salon.id,
      availableHours: createSalonServiceDto.availableHours,
      reservedHours: createSalonServiceDto.reservedHours,
      reserveDate: new Date(createSalonServiceDto.reserveAt),
    });
  }

  @Patch('/salon-service/:id')
  @SalonOwnerEndpoint()
  updateSalonService(
    @Param('id') id: string,
    @Body() updateSalonServiceDto: UpdateSalonServiceDto,
  ) {
    return this.salonServiceService.update(+id, {
      availableHours: updateSalonServiceDto.availableHours,
      reservedHours: updateSalonServiceDto.reservedHours,
      reserveDate: new Date(updateSalonServiceDto.reserveAt),
    });
  }

  @Get('/salon-service/mine')
  @SalonOwnerEndpoint()
  findMineSalonServices(
    @User() user: UserEntity,
  ): Promise<SalonServicesEntity[]> {
    return this.salonServiceService.findAll({
      where: { salon_id: user.salon.id },
    });
  }

  @Get('/salon-service')
  @PublicEndpoint()
  findAllSalonServices(): Promise<SalonServicesEntity[]> {
    return this.salonServiceService.findAll();
  }

  @Get('/salon-service/:id')
  @PublicEndpoint()
  findOneSalonService(@Param('id') id: string): Promise<SalonServicesEntity> {
    return this.salonServiceService.findOne(+id);
  }

  @Delete('/salon-service/:id')
  @AdminEndpoint()
  removeSalonService(@Param('id') id: string): Promise<DeleteResult> {
    return this.salonServiceService.remove(+id);
  }
}
