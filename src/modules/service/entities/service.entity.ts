import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/entities.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'services' })
export class ServiceEntity extends BaseEntity<ServiceEntity> {
  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  name!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  description!: string | null;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar' })
  image!: string | null;
}
