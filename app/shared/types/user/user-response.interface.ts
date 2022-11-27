import { IBasic } from '@/shared/types/basic.interface';

export interface IUserResponse extends IBasic {
  login: string;
  role: 'admin' | 'superadmin' | 'user';
  telegram_id: string;
  created_at: Date | string;
}
