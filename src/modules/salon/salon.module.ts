import { Module } from '@nestjs/common';
import { SalonService } from './services/salon.service';
import { SalonController } from './controllers/salon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonEntity } from './entities/salon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalonEntity])],
  controllers: [SalonController],
  providers: [SalonService],
  exports: [SalonService],
})
export class SalonModule {}
