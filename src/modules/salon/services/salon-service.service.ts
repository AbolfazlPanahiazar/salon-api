import { Injectable } from '@nestjs/common';
import { DeleteResult, FindManyOptions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalonServicesEntity } from '../entities/salon-service.entity';

@Injectable()
export class SalonServiceService {
  constructor(
    @InjectRepository(SalonServicesEntity)
    private readonly salonServiceRepository: Repository<SalonServicesEntity>,
  ) {}

  create(createSalonDto: Partial<SalonServicesEntity>): Promise<InsertResult> {
    return this.salonServiceRepository.insert(createSalonDto);
  }

  findAll(options?: FindManyOptions<SalonServicesEntity>): Promise<SalonServicesEntity[]> {
    return this.salonServiceRepository.find(options);
  }

  findOne(id: number): Promise<SalonServicesEntity> {
    return this.salonServiceRepository.findOneOrFail({ where: { id } });
  }

  update(
    id: number,
    updateSalonDto: Partial<SalonServicesEntity>,
  ): Promise<UpdateResult> {
    return this.salonServiceRepository.update({ id }, updateSalonDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.salonServiceRepository.delete({ id });
  }
}
