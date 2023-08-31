/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configService } from '.././../../core/config.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate({
    id,
    tempToken,
  }: {
    id: number;
    tempToken: boolean;
    iat: number;
  }): Promise<UserEntity> {
    let user = null;
    user = await this.userService.findOneByIdForJwt(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    // Prevent users who activated 2fa use login token to call endpoints
    if (tempToken) {
      user.qrCodeSecret = null;
    }

    return user as UserEntity;
  }
}
