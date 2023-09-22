import { BaseEntity } from 'src/core/entities.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ServiceEntity } from 'src/modules/service/entities/service.entity';
import { ApiProperty } from '@nestjs/swagger';
import { WorkingHoursEnum } from '../enums/working-hour.enum';

@Entity({ name: 'salons' })
export class SalonEntity extends BaseEntity<SalonEntity> {
  @ApiProperty()
  @Column({ default: 0 })
  owner_id!: number;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { lazy: true })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner!: UserEntity;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  name!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  phone!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  address!: string | null;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  image!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  video!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  map!: string | null;

  @ApiProperty({ type: ServiceEntity, isArray: true })
  @ManyToMany(() => ServiceEntity)
  @JoinTable()
  services: ServiceEntity[];

  @ApiProperty({ isArray: true, enum: WorkingHoursEnum })
  @Column('simple-array', { nullable: true })
  workingHours: WorkingHoursEnum[];
}
