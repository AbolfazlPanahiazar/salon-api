import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from '../entities/service.entity';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  create(createServiceDto: Partial<ServiceEntity>): Promise<ServiceEntity> {
    return this.serviceRepository.save(createServiceDto);
  }

  async findManyAndCount(
    limit = 20,
    skip = 0,
    search?: string,
  ): Promise<{ services: ServiceEntity[]; count: number }> {
    const query = this.serviceRepository.createQueryBuilder('services');
    if (search) {
      query.andWhere('services.name LIKE :name', { name: `%${search}%` });
    }
    const [services, count] = await query
      .take(limit)
      .skip(skip)
      .getManyAndCount();
    return { services, count };
  }

  async findOne(find: FindOptionsWhere<ServiceEntity>): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { ...find },
    });
    if (!service) {
      throw new NotFoundException(`Service not found.`);
    }
    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceEntity> {
    await this.serviceRepository.update({ id }, updateServiceDto);
    return this.serviceRepository.findOne({ where: { id } });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.serviceRepository.delete({ id });
  }
}
