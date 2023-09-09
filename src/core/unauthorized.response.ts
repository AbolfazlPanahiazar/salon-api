import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({
    default: 401,
    type: 'integer',
    description: 'response status code',
  })
  statusCode!: number;

  @ApiProperty({
    default: 'Unauthorized',
    type: 'string',
    description: 'Error message',
  })
  message!: string;
}
