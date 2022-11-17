import { RoleType } from '@/shared/types/auth/role.type';

export interface IUserCreate {
  login: string;
  telegram_id: string;
  role: RoleType;
  password: string;
}
