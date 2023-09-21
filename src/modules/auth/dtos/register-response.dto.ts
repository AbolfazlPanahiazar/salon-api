import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class RegisterLoginResponseDto {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  token: string;
}
