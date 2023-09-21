import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    console.log({ email, password });
    const user = await this.usersService.findOneOrNull({
      email,
    });
    console.log({ user });

    if (!user || !user.password) {
      throw new UnauthorizedException('Username or Password is incorrect.');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Username or Password is incorrect.');
    }

    return user;
  }

  generateToken(id: number, payload: Record<string, unknown> = {}): string {
    return this.jwtService.sign({ id, ...payload });
  }

  async saveUserLastLogin(id: number): Promise<void> {
    await this.usersService.save({
      id: id,
      lastLoginAt: new Date(),
    });
    await this.usersService.findOne({ id });
  }
}
