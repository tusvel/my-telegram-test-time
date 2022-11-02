import axios from 'axios';
import Cookies from 'js-cookie';

import { removeTokensStorage } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';

import { errorHandler } from '@/utils/errorHandler';

import { API_SERVER_URL, API_URL } from '@/config/api.config';
import { IS_PRODUCTION } from '@/config/constants';

import { getContentType } from './api.helpers';

export const $host = axios.create({
  baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
  headers: getContentType()
});

export const $auth = axios.create({
  baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
  headers: getContentType()
});

$auth.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');

  if (config.headers && accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
});

$auth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorHandler(error) === 'jwt expired' ||
        errorHandler(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return $auth.request(originalRequest);
      } catch (error) {
        if (errorHandler(error) === 'jwt expired') removeTokensStorage();
      }
    }

    throw error;
  }
);
