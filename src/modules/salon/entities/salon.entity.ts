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
import { SalonServicesEntity } from './salon-service.entity';
import { ServiceEntity } from 'src/modules/service/entities/service.entity';

@Entity({ name: 'salons' })
export class SalonEntity extends BaseEntity<SalonEntity> {
  @Column({ default: 0 })
  owner_id!: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner!: UserEntity;

  @Column({ nullable: true, type: 'varchar' })
  name!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  phone!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  address!: string | null;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  image!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  video!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  map!: string | null;

  @OneToMany(() => SalonServicesEntity, (ss) => ss.salon_id)
  salon_services: SalonServicesEntity[];

  @ManyToMany(() => ServiceEntity, (servie) => servie.salons)
  @JoinTable()
  services: ServiceEntity[];
}
