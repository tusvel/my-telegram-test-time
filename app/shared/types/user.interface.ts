import { IBasic } from '@/shared/types/basic.interface';
import { RoleType } from '@/shared/types/role.type';

export interface IUser extends IBasic {
  role: RoleType;
}
