import { IUserResponse } from '@/shared/types/user/user-response.interface';

export interface IUserInitialState {
  user: IUserResponse | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  username: string;
  password: string;
}
