import Cookies from 'js-cookie';

import { ITokens } from '@/shared/types/auth/jwt/tokens-response.interface';

import {
  removeTokensStorage,
  saveToStorage
} from '@/services/auth/auth.helper';
import { UserService } from '@/services/user/user.service';

import { getAuthenticateApi } from '@/config/api.config';

import { $host } from '../../api/interceptors';

export const AuthService = {
  async login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const response = await $host.post<ITokens>(
      getAuthenticateApi('/login'),
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    if (response.data.access_token) {
      saveToStorage(response.data);
    }
    return response.data;
  },

  async logout() {
    removeTokensStorage();
    localStorage.removeItem('user');
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken');
    const response = await $host.post<ITokens>(getAuthenticateApi('/refresh'), {
      refresh_token: refreshToken
    });
    if (response.data.access_token) {
      saveToStorage(response.data);
    }
    const user = await UserService.getMe();
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      user: user
    };
  }
};
