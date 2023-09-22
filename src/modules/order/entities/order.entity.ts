import { Transform } from 'class-transformer';
import { BaseEntity } from 'src/core/entities.entity';
import { WorkingHoursEnum } from 'src/modules/salon/enums/working-hour.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity<OrderEntity> {
  @Column({ nullable: true })
  salon_service_id!: number | null;

  @Transform(({ value }) => WorkingHoursEnum[value])
  @Column({ default: WorkingHoursEnum.EIGHT })
  time!: WorkingHoursEnum;

  @Column({ default: 0 })
  user_id!: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: UserEntity;
}
