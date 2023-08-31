import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  create(createServiceDto: Partial<ServiceEntity>): Promise<InsertResult> {
    return this.serviceRepository.insert(createServiceDto);
  }

  findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find();
  }

  findOne(id: number): Promise<ServiceEntity> {
    return this.serviceRepository.findOneOrFail({ where: { id } });
  }

  update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<UpdateResult> {
    return this.serviceRepository.update({ id }, updateServiceDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.serviceRepository.delete({ id });
  }
}
