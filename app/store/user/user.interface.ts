import { IUser } from '@/shared/types/user/user-create.interface';

export interface IUserInitialState {
  user: IUser | null;
  isLoading: boolean;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
