import { ITokens } from '@/shared/types/auth/jwt/tokens-response.interface';
import { IUserResponse } from '@/shared/types/user/user-response.interface';

export interface IUserInitialState {
  user: IUserResponse | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUserResponse;
}
