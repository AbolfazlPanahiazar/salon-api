import { BaseEntity } from 'src/core/entities.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SalonEntity } from './salon.entity';
import { Transform } from 'class-transformer';
import { WorkingHoursEnum } from '../enums/working-hour.enum';
import { ServiceEntity } from 'src/modules/service/entities/service.entity';

@Entity({ name: 'salon-services' })
export class SalonServicesEntity extends BaseEntity<SalonServicesEntity> {
  @Column({ default: 0 })
  salon_id!: number;

  @ManyToOne(() => SalonEntity)
  @JoinColumn({
    name: 'salon_id',
    referencedColumnName: 'id',
  })
  salon!: SalonEntity | null;

  @Transform(({ value }) =>
    value.map((hour: WorkingHoursEnum) => WorkingHoursEnum[hour]),
  )
  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
    default: '{}',
    name: 'available_hours',
  })
  availableHours!: WorkingHoursEnum[];

  @Transform(({ value }) =>
    value.map((type: WorkingHoursEnum) => WorkingHoursEnum[type]),
  )
  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
    default: '{}',
    name: 'reserved_hours',
  })
  reservedHours!: WorkingHoursEnum[];

  @CreateDateColumn({ name: 'reserve_at' })
  reserveAt!: Date;

  @Column({ default: 0 })
  service_id!: number;

  @ManyToOne(() => ServiceEntity)
  @JoinColumn({
    name: 'service_id',
    referencedColumnName: 'id',
  })
  service!: ServiceEntity;
}
