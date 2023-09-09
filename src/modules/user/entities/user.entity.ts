import { BaseEntity } from 'src/core/entities.entity';
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SalonEntity } from 'src/modules/salon/entities/salon.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ unique: true, nullable: true, type: 'varchar' })
  @Index()
  email!: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column({ unique: true, nullable: true })
  @Index()
  username!: string;

  @Column({ nullable: true, name: 'image' })
  image!: string;

  @Column({ default: false, name: 'is_admin' })
  isAdmin!: boolean;

  @Column({ default: false, name: 'is_store_owner' })
  isStoreOwner!: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ default: false, name: 'is_barber' })
  isBarber!: boolean;

  @Column({ type: 'varchar', name: 'first_name', nullable: true })
  firstName!: string | null;

  @Column({ type: 'varchar', name: 'last_name', nullable: true })
  lastName!: string | null;

  @Column({ type: 'timestamp', name: 'last_login_at', nullable: true })
  lastLoginAt!: Date | null;

  @OneToOne(() => SalonEntity)
  @OneToOne(() => SalonEntity, (salon) => salon.owner)
  salon!: SalonEntity | null;

  @BeforeInsert()
  beforeInsert(): void {
    this.hashPassword();
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    this.hashPassword();
  }

  private hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
