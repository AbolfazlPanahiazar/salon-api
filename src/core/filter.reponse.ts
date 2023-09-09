import { ApiProperty } from '@nestjs/swagger';
import { PaginationSchema } from './pagination.response';

export class FilterSchema {
  @ApiProperty({
    required: true,
    type: 'integer',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Title',
  })
  title!: string;
}

export class FilterPaginationSchema extends PaginationSchema {
  @ApiProperty({
    description: 'List of items',
    type: FilterSchema,
    required: true,
    nullable: false,
    isArray: true,
  })
  items?: FilterSchema[];
}
