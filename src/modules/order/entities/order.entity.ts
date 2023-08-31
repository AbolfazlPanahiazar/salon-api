import { BaseEntity } from 'src/core/entities.entity';
import { SalonServicesEntity } from 'src/modules/salon/entities/salon-service.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity<OrderEntity> {
  @Column({ nullable: true })
  salon_service_id!: number | null;

  @ManyToOne(() => SalonServicesEntity)
  @JoinColumn({
    name: 'salon_service_id',
    referencedColumnName: 'id',
  })
  salon_service!: SalonServicesEntity | null;
}
