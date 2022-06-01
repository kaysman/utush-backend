import { Observable } from 'rxjs';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '@prisma/client';

import { PermissionEnum } from '../enums/permission.enum';

@Injectable ()
export class PermissionGuard implements CanActivate {
    constructor (private reflector: Reflector){}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requirePermission = this.reflector.getAllAndOverride<PermissionEnum[]>('permission', [context.getHandler()],);


        console.log('aaaaaa');
        

        const request = context.switchToHttp().getRequest();
        const permissions: Permission[] = request.user.permissions;
        const permissionCodes = permissions.map((v) => v.code.toUpperCase().split('-').join('_'));

        console.log(permissionCodes);

        if (!requirePermission) return true;

        return requirePermission.some((permission) => permissionCodes.includes(permission));

    }

}