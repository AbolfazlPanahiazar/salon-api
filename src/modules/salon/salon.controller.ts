import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalonService } from './salon.service';
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

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Post()
  @SalonOwnerEndpoint()
  create(@Body() createSalonDto: CreateSalonDto, @User() user: UserEntity) {
    return this.salonService.create({ ...createSalonDto, owner_id: user.id });
  }

  @Patch(':id')
  @SalonOwnerEndpoint()
  update(@Param('id') id: string, @Body() updateSalonDto: UpdateSalonDto) {
    return this.salonService.update(+id, updateSalonDto);
  }

  @Get('/mine')
  @SalonOwnerEndpoint()
  findMine(@User() user: UserEntity): Promise<SalonEntity[]> {
    return this.salonService.findAll({ where: { owner_id: user.id } });
  }

  @Get()
  @PublicEndpoint()
  findAll() {
    return this.salonService.findAll();
  }

  @Get(':id')
  @PublicEndpoint()
  findOne(@Param('id') id: string) {
    return this.salonService.findOne(+id);
  }

  @Delete(':id')
  @AdminEndpoint()
  remove(@Param('id') id: string) {
    return this.salonService.remove(+id);
  }
}
