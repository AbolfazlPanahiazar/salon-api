import { BaseEntity } from 'src/core/entities.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'services' })
export class ServiceEntity extends BaseEntity<ServiceEntity> {
  @Column({ nullable: true, type: 'varchar' })
  name!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  description!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  image!: string | null;
}
