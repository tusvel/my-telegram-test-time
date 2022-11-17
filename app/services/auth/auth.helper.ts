import Cookies from 'js-cookie';

import { ITokens } from '@/shared/types/auth/jwt/tokens-response.interface';

import { IAuthResponse } from '@/store/user/user.interface';

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set('accessToken', data.access_token);
  Cookies.set('refreshToken', data.refresh_token);
};

export const removeTokensStorage = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
