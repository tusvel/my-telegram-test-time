import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserResponse } from '@/shared/types/user/user-response.interface';

import { AuthService } from '@/services/auth/auth.service';
import { UserService } from '@/services/user/user.service';

import { errorHandler } from '@/utils/errorHandler';

import { IEmailPassword } from '@/store/user/user.interface';

export const login = createAsyncThunk<IUserResponse, IEmailPassword>(
  'AuthService/login',
  async ({ username, password }, thunkApi) => {
    try {
      await AuthService.login(username, password);
      return await UserService.getMe();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('AuthService/logout', async () => {
  await AuthService.logout();
});

export const checkAuth = createAsyncThunk(
  'AuthService/checkAuth',
  async (_, thunkApi) => {
    try {
      return await AuthService.getNewTokens();
    } catch (error) {
      if (errorHandler(error) === 'jwt expired') {
        thunkApi.dispatch(logout());
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);
