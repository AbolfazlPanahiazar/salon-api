import { BaseEntity } from 'src/core/entities.entity';
import { SalonEntity } from 'src/modules/salon/entities/salon.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'services' })
export class ServiceEntity extends BaseEntity<ServiceEntity> {
  @Column({ nullable: true, type: 'varchar' })
  name!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  description!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  image!: string | null;

  @ManyToMany(() => SalonEntity, (user) => user.services)
  @JoinTable()
  salons: SalonEntity[];
}
