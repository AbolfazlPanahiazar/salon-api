import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { User } from 'src/core/decorators/user.decorator';
import { UserEndpoint } from 'src/core/swagger.decorator';
import { UserService } from '../user/services/user.service';
import { serialize } from 'src/core/utils/serialize';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('profile')
  @UserEndpoint()
  async getProfile(@User() user: UserEntity): Promise<UserEntity> {
    return this.userService
      .findOne({ id: user.id })
      .then((res) => serialize(res!));
  }
}
