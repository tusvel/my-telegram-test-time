import Cookies from 'js-cookie';

import {
  removeTokensStorage,
  saveToStorage
} from '@/services/auth/auth.helper';

import { getAuthenticateApi } from '@/config/api.config';

import { IAuthResponse } from '@/store/user/user.interface';

import { $host } from '../../api/interceptors';

export const AuthService = {
  async register(email: string, password: string) {
    const response = await $host.post(getAuthenticateApi('/register'), {
      email,
      password
    });
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },

  async login(email: string, password: string) {
    const response = await $host.post(getAuthenticateApi('/login'), {
      email,
      password
    });
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },

  async logout() {
    removeTokensStorage();
    localStorage.removeItem('user');
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken');
    const response = await $host.post<IAuthResponse>(
      getAuthenticateApi('/refresh'),
      {
        refreshToken
      }
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  }
};
