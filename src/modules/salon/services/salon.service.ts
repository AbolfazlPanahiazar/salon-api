import { Injectable } from '@nestjs/common';
import { SalonEntity } from '../entities/salon.entity';
import {
  DeleteResult,
  FindManyOptions,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalonService {
  constructor(
    @InjectRepository(SalonEntity)
    private readonly salonRepository: Repository<SalonEntity>,
  ) {}

  create(createSalonDto: Partial<SalonEntity>): Promise<InsertResult> {
    return this.salonRepository.insert(createSalonDto);
  }

  findAll(options?: FindManyOptions<SalonEntity>): Promise<SalonEntity[]> {
    return this.salonRepository.find(options);
  }

  findOne(id: number): Promise<SalonEntity> {
    return this.salonRepository.findOneOrFail({ where: { id } });
  }

  update(
    id: number,
    updateSalonDto: Partial<SalonEntity>,
  ): Promise<UpdateResult> {
    return this.salonRepository.update({ id }, updateSalonDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.salonRepository.delete({ id });
  }
}
