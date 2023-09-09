/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IsEnum, ValidationArguments } from 'class-validator';
import { AdminJwtAuthGuard } from 'src/modules/auth/classes/admin.guard';
import { SalonOwnerJwtAuthGuard } from 'src/modules/auth/classes/salon-owner.guard';
import { UserJwtAuthGuard } from 'src/modules/auth/classes/user.guard';
import { Transform } from 'class-transformer';

export function PublicEndpoint() {
  return applyDecorators(SetMetadata('auth', false));
}

export function UserEndpoint() {
  return applyDecorators(ApiBearerAuth(), UseGuards(UserJwtAuthGuard));
}

export function AdminEndpoint() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AdminJwtAuthGuard));
}

export function SalonOwnerEndpoint() {
  return applyDecorators(ApiBearerAuth(), UseGuards(SalonOwnerJwtAuthGuard));
}

export function IsEnumWithMessage(entity: object, isArray?: boolean) {
  return applyDecorators(
    IsEnum(entity, {
      each: isArray,
      message: (args: ValidationArguments) =>
        `${args.property} must be one of: ${Object.values(entity)
          .filter((i) => Number.isNaN(+i))
          .join(', ')}.`,
    }),
  );
}

export function stringToEnum(numberEnum: any, value: string): number {
  const tierStrings = Object.keys(numberEnum).filter((i) => Number.isNaN(+i));
  return tierStrings.indexOf(value);
}

export function StringToEnum(numberEnum: any) {
  return applyDecorators(
    Transform((v) => stringToEnum(numberEnum, v.value)),
    IsEnumWithMessage(numberEnum),
  );
}
