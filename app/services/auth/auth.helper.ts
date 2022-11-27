import Cookies from 'js-cookie';

import { ITokens } from '@/shared/types/auth/jwt/tokens-response.interface';

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set('accessToken', data.access_token);
  Cookies.set('refreshToken', data.refresh_token);
};

export const removeTokensStorage = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  localStorage.removeItem('user');
};

export const saveToStorage = (data: ITokens) => {
  saveTokensStorage(data);
};
