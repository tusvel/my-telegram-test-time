import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '@/services/auth/auth.service';

import { errorHandler } from '@/utils/errorHandler';

import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface';

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'AuthService/register',
  async ({ email, password }, thunkApi) => {
    try {
      return await AuthService.register(email, password);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'AuthService/login',
  async ({ email, password }, thunkApi) => {
    try {
      return await AuthService.login(email, password);
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
