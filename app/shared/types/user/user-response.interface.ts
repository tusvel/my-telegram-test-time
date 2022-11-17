import { RoleType } from '@/shared/types/auth/role.type';
import { IBasic } from '@/shared/types/basic.interface';

export interface IUserPatch extends IBasic {
  login: string;
  role: RoleType;
  telegram_id: string;
  created_at: Date | string;
}
