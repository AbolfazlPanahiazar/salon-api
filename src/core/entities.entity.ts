import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class MasterEntity<T> {
  constructor(input?: Partial<T>) {
    if (input) {
      Object.assign(this, input);
    }
  }
}

export class BaseEntity<T> extends MasterEntity<T> {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}