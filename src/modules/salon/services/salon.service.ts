import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SalonEntity } from '../entities/salon.entity';
import { DataSource, DeleteResult, EntityManager, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateSalonDto } from '../dtos/create-salon.dto';
import { ServiceEntity } from 'src/modules/service/entities/service.entity';
import { UpdateSalonDto } from '../dtos/update-salon.dto';

@Injectable()
export class SalonService {
  constructor(
    @InjectRepository(SalonEntity)
    private readonly salonRepository: Repository<SalonEntity>,
    private readonly entityManager: EntityManager,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createSalonDto: CreateSalonDto,
    owner_id: number,
  ): Promise<SalonEntity> {
    const { serviceIds, workingHours, ...rest } = createSalonDto;
    const salon = await this.salonRepository.findOne({
      where: { owner_id },
    });
    if (salon) {
      throw new BadRequestException(
        'You already registered a salon, try to edit it.',
      );
    }
    const newSalon = this.salonRepository.create({
      owner_id,
      ...rest,
      workingHours: workingHours || [],
    });
    if (serviceIds && serviceIds.length > 0) {
      const services = await this.entityManager.findByIds(
        ServiceEntity,
        serviceIds,
      );
      newSalon.services = services;
    }
    return this.salonRepository.save(newSalon);
  }

  async findManyAndCount(
    limit = 20,
    skip = 0,
    search?: string,
  ): Promise<{ salons: SalonEntity[]; count: number }> {
    const query = this.salonRepository
      .createQueryBuilder('salons')
      .leftJoinAndSelect('salons.services', 'services');
    if (search) {
      query.where('salons.name LIKE :name', { name: `%${search}%` });
    }
    const [salons, count] = await query
      .take(limit)
      .skip(skip)
      .getManyAndCount();
    return { salons, count };
  }

  async findOne(id: number): Promise<SalonEntity> {
    try {
      const salon = await this.salonRepository
        .createQueryBuilder('salon')
        .leftJoinAndSelect('salon.services', 'services')
        .where('salon.id = :id', { id })
        .getOneOrFail();

      return salon;
    } catch (error) {
      throw new NotFoundException('Salon not found');
    }
  }

  update(id: number, updateSalonDto: UpdateSalonDto): Promise<SalonEntity> {
    return this.salonRepository.save({ id, ...updateSalonDto });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.salonRepository.delete({ id });
  }

  async findByOwnerId(id: number): Promise<SalonEntity> {
    return this.salonRepository.findOne({
      where: { owner_id: id },
      relations: ['services'],
    });
  }

  async updateSalonByOwnerId(
    owner_id: number,
    updateSalonDto: UpdateSalonDto,
  ): Promise<SalonEntity> {
    const salon = await this.salonRepository.findOne({
      where: { owner_id },
      relations: ['services'],
    });
    if (!salon) {
      throw new NotFoundException('Salon not found, register a salon!');
    }
    Object.assign(salon, updateSalonDto);
    return this.salonRepository.save(salon);
  }
}
