/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminJwtAuthGuard } from 'src/modules/auth/classes/admin.guard';
import { UserJwtAuthGuard } from 'src/modules/auth/classes/user.guard';

export function PublicEndpoint() {
  return applyDecorators(SetMetadata('auth', false));
}

export function UserEndpoint() {
  return applyDecorators(ApiBearerAuth(), UseGuards(UserJwtAuthGuard));
}

export function AdminEndpoint() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AdminJwtAuthGuard));
}
