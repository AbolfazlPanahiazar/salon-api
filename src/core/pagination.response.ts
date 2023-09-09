import { ApiProperty } from '@nestjs/swagger';

export class PaginationSchema {
  @ApiProperty({
    description: 'Count items in pagination responses',
    type: 'integer',
    example: 2,
    required: true,
    nullable: false,
  })
  count!: number;
}
