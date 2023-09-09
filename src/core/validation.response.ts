import { ApiProperty } from '@nestjs/swagger';

export class ValidationResponse {
  @ApiProperty({
    default: 400,
    type: 'integer',
    description: 'status code',
  })
  statusCode!: number;

  @ApiProperty({
    default: ['Please provide all required fields'],
    type: 'array',
    description: 'Array of error messages',
    isArray: true,
  })
  message!: string[];

  @ApiProperty({
    default: 'Bad Request',
    description: 'Error message',
  })
  error!: string;
}
