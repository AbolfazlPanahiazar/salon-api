import { Module } from '@nestjs/common';
import { SalonService } from './services/salon.service';
import { SalonController } from './salon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from './entities/salon.entity';
import { SalonServicesEntity } from './entities/salon-service.entity';
import { SalonServiceService } from './services/salon-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalonEntity, SalonServicesEntity])],
  controllers: [SalonController],
  providers: [SalonService, SalonServiceService],
  exports: [SalonService, SalonServiceService],
})
export class SalonModule {}
