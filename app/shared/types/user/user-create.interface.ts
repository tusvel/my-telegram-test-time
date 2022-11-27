export interface IUserCreate {
  login: string;
  telegram_id: string;
  role: 'superadmin' | 'admin' | 'user';
  password: string;
}
