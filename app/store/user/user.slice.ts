import { createSlice } from '@reduxjs/toolkit';

import { getStoreLocal } from '@/utils/local-storage';

import { checkAuth, login, logout, register } from '@/store/user/user.actions';
import { IUserInitialState } from '@/store/user/user.interface';

const initialState: IUserInitialState = {
  user: getStoreLocal('user'),
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
      });
  }
});

export const { reducer } = userSlice;
