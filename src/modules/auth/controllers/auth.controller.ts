import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../user/entities/user.entity';
import { User } from 'src/core/decorators/user.decorator';
import { PublicEndpoint, UserEndpoint } from 'src/core/swagger.decorator';
import { UserService } from '../../user/services/user.service';
import { serialize } from 'src/core/utils/serialize';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags(AuthController.name)
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

  @Post('login')
  @PublicEndpoint()
  async loginAdmin(
    @Body() body: LoginDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.authService.validateUser(body.email, body.password);

    const token = this.authService.generateToken(user.id!, { tempToken: true });

    await this.authService.saveUserLastLogin(user.id!);

    return { user: serialize(user), token };
  }

  @Post('/register/user')
  @PublicEndpoint()
  async registerUser(
    @Body() body: RegisterDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userService.save({
      ...body,
      isStoreOwner: true,
      password: bcrypt.hashSync(body.password, 10),
    });

    const token = this.authService.generateToken(user.id!, { tempToken: true });

    await this.authService.saveUserLastLogin(user.id!);

    return { user: serialize(user), token };
  }

  @Post('/register/salon')
  @PublicEndpoint()
  async registerSalon(
    @Body() body: RegisterDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userService.save({
      ...body,
      isStoreOwner: true,
      password: bcrypt.hashSync(body.password, 10),
    });

    const token = this.authService.generateToken(user.id!, { tempToken: true });

    await this.authService.saveUserLastLogin(user.id!);

    return { user: serialize(user), token };
  }

  @Post('/register/admin')
  @PublicEndpoint()
  async registerAdmin(
    @Body() body: RegisterDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userService.save({
      ...body,
      isAdmin: true,
      password: bcrypt.hashSync(body.password, 10),
    });

    const token = this.authService.generateToken(user.id!, { tempToken: true });

    await this.authService.saveUserLastLogin(user.id!);

    return { user: serialize(user), token };
  }
}
