import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
