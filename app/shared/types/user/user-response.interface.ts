import { IBasic } from '@/shared/types/basic.interface';

export interface IUserResponse extends IBasic {
  created_at: Date | string;
  login: string;
  role: 'admin' | 'superadmin' | 'user';
}
