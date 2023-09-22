/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SalonOwnerJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, _info: any, context: any) {
    if (err || !user || user.isStoreOwner !== true) {
      throw (
        err ||
        new UnauthorizedException(`Your user doesn't have access to this api`)
      );
    }
    return user;
  }
}
