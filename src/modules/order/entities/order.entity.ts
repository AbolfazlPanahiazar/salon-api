import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/entities.entity';
import { SalonEntity } from 'src/modules/salon/entities/salon.entity';
import { WorkingHoursEnum } from 'src/modules/salon/enums/working-hour.enum';
import { ServiceEntity } from 'src/modules/service/entities/service.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity<OrderEntity> {
  @ApiProperty()
  @Column({ default: 0 })
  user_id!: number;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: UserEntity;

  @ApiProperty()
  @Column({ default: 0 })
  salon_id!: number;

  @ApiProperty({ type: () => SalonEntity })
  @ManyToOne(() => SalonEntity, { nullable: true })
  @JoinColumn({
    name: 'salon_id',
    referencedColumnName: 'id',
  })
  salon!: SalonEntity | null;

  @ApiProperty({ type: () => WorkingHoursEnum })
  @Column({
    type: 'enum',
    enum: WorkingHoursEnum,
    nullable: true,
    name: 'reserved_hour',
  })
  reservedHour: WorkingHoursEnum | null;

  @ApiProperty()
  @Column({ type: 'numeric', nullable: true })
  price: number | null;

  @ApiProperty({ type: () => ServiceEntity, isArray: true })
  @ManyToMany(() => ServiceEntity)
  @JoinTable()
  services: ServiceEntity[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}
