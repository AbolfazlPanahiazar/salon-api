import { Injectable } from '@nestjs/common';
import { SalonEntity } from '../entities/salon.entity';
import {
  DataSource,
  DeleteResult,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalonService {
  constructor(
    @InjectRepository(SalonEntity)
    private readonly salonRepository: Repository<SalonEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(createSalonDto: Partial<SalonEntity>): Promise<InsertResult> {
    return this.salonRepository.insert(createSalonDto);
  }

  async findManyAndCount(
    limit = 20,
    skip = 0,
    search?: string,
  ): Promise<{ salons: SalonEntity[]; count: number }> {
    const query = this.salonRepository.createQueryBuilder('salons');

    if (search) {
      query.where('salons.name LIKE :name', { name: `%${search}%` });
    }

    const [salons, count] = await query
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return { salons, count };
  }

  async findAll(
    skip: number = 0,
    limit: number = 10,
    search?: string,
  ): Promise<{ salons: SalonEntity[]; count: number }> {
    let query = `
      SELECT
        s.id,
        s.name,
        s.created_at as "createdAt",
        (count(s.id) OVER())::int AS total,
      FROM
        salons s
    `;

    if (search) {
    }

    query += `
      ORDER BY
        s.id DESC
      LIMIT
        ${limit}
      OFFSET
        ${skip}
      `;

    const res = await this.dataSource.query(query);

    return {
      salons: res,
      count: res.length ? res[0].total : 0,
    };
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

  findByOwnerId(id: number): Promise<SalonEntity> {
    return this.salonRepository.findOne({ where: { owner_id: id } });
  }
}
