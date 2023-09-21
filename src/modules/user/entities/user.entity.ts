import { BaseEntity } from 'src/core/entities.entity';
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SalonEntity } from 'src/modules/salon/entities/salon.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users', schema: 'public' })
export class UserEntity extends BaseEntity<UserEntity> {
  @ApiProperty()
  @Column({ unique: true, nullable: true, type: 'varchar' })
  @Index()
  email!: string | null;

  @Column({ nullable: true })
  @Exclude()
  password!: string;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  username!: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'image' })
  image!: string;

  @ApiProperty()
  @Column({ default: false, name: 'is_admin' })
  isAdmin!: boolean;

  @ApiProperty()
  @Column({ default: false, name: 'is_store_owner' })
  isStoreOwner!: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'first_name', nullable: true })
  firstName!: string | null;

  @ApiProperty()
  @Column({ type: 'varchar', name: 'last_name', nullable: true })
  lastName!: string | null;

  @ApiProperty()
  @Column({ type: 'timestamp', name: 'last_login_at', nullable: true })
  lastLoginAt!: Date | null;

  @OneToOne(() => SalonEntity)
  @OneToOne(() => SalonEntity, (salon) => salon.owner)
  salon!: SalonEntity | null;
}
