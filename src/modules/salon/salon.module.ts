import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from './entities/salon.entity';
import { SalonServicesEntity } from './entities/salon-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalonEntity, SalonServicesEntity])],
  controllers: [SalonController],
  providers: [SalonService],
  exports: [SalonService],
})
export class SalonModule {}
