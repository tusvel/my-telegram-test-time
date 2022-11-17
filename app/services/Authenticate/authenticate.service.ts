import { IRefreshToken } from '@/shared/types/auth/jwt/refresh-token.interface';
import { ITokens } from '@/shared/types/auth/jwt/tokens-response.interface';

import { getAuthenticateApi } from '@/config/api.config';

import { $host } from '../../api/interceptors';

export const AuthenticateService = {
  async login(data: { username: string; password: string }) {
    return await $host.post<ITokens>(getAuthenticateApi('/login'), data);
  },

  async refresh(refreshToken: IRefreshToken) {
    return await $host.post<ITokens>(
      getAuthenticateApi('/refresh'),
      refreshToken
    );
  }
};
