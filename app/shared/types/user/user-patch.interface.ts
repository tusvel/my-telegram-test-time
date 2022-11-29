import { IBasic } from '@/shared/types/basic.interface';

export interface IUserPatch extends IBasic {
  role: 'superadmin' | 'admin' | 'user' | string;
  password: string;
}
