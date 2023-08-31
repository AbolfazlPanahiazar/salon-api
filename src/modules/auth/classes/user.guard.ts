/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, _: any, __: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
