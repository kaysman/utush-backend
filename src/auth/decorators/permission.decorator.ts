import { SetMetadata } from '@nestjs/common';

import { PermissionEnum } from '../enums/permission.enum';

export const RequirePermission = (... permission: PermissionEnum[])=> SetMetadata("permission", permission)