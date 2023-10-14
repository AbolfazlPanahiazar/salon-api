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
import { SalonService } from '../services/salon.service';
import { CreateSalonDto } from '../dtos/create-salon.dto';
import { UpdateSalonDto } from '../dtos/update-salon.dto';
import {
  AdminEndpoint,
  PublicEndpoint,
  SalonOwnerEndpoint,
} from 'src/core/swagger.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { UserEntity } from '../../user/entities/user.entity';
import { SalonEntity } from '../entities/salon.entity';
import { DeleteResult, InsertResult } from 'typeorm';
import { QueryAllSalonsDto } from '../dtos/query-all-salons.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { VerifySalonDto } from '../dtos/verify.dto';

@Controller('salon')
@ApiTags(SalonController.name)
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @ApiResponse({ type: SalonEntity, status: 201 })
  @Post('/verify-salon/:id')
  @AdminEndpoint()
  verifySalon(
    @Body() body: VerifySalonDto,
    @User() user: UserEntity,
    @Param('id') id: string,
  ): Promise<SalonEntity> {
    return this.salonService.update(+id, { verified: body.verified });
  }

  @ApiResponse({ type: SalonEntity, status: 201 })
  @Post('/register-salon')
  @SalonOwnerEndpoint()
  create(
    @Body() createSalonDto: CreateSalonDto,
    @User() user: UserEntity,
  ): Promise<SalonEntity> {
    return this.salonService.create(createSalonDto, user.id);
  }

  @ApiResponse({ type: SalonEntity, status: 200, isArray: true })
  @Get('/get-all-salons')
  @PublicEndpoint()
  findAll(
    @Query() { limit, search, skip, verified }: QueryAllSalonsDto,
  ): Promise<{ salons: SalonEntity[]; count: number }> {
    return this.salonService.findManyAndCount(limit, skip, search, verified);
  }

  @ApiResponse({ type: SalonEntity, status: 200 })
  @Get('/get-salon-by-id/:id')
  @PublicEndpoint()
  findOne(@Param('id') id: string): Promise<SalonEntity> {
    return this.salonService.findOne(+id);
  }

  @ApiResponse({ type: SalonEntity, status: 201 })
  @Patch('/update-salon/:id')
  @AdminEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateSalonDto: UpdateSalonDto,
  ): Promise<SalonEntity> {
    return this.salonService.update(+id, updateSalonDto);
  }

  @Delete('/delete-salon/:id')
  @AdminEndpoint()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.salonService.remove(+id);
  }

  @ApiResponse({ type: SalonEntity, status: 200 })
  @Get('/mine')
  @SalonOwnerEndpoint()
  findMine(@User() user: UserEntity): Promise<SalonEntity> {
    return this.salonService.findByOwnerId(user.id);
  }

  @ApiResponse({ type: SalonEntity, status: 201 })
  @Patch('/mine')
  @SalonOwnerEndpoint()
  updateMine(
    @User() user: UserEntity,
    @Body() updateSalonByOwnerId: UpdateSalonDto,
  ): Promise<SalonEntity> {
    return this.salonService.updateSalonByOwnerId(
      user.id,
      updateSalonByOwnerId,
    );
  }
}
