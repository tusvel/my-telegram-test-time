import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUserResponse } from '@/shared/types/user/user-response.interface';

import {
  addClient,
  getAllClients,
  removeClient
} from '@/store/client/client.actions';
import { IClientInitialState } from '@/store/client/client.interface';

const initialState: IClientInitialState = {
  clients: null
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<IUserResponse>) => {
      state.clients =
        (state.clients &&
          state.clients.filter((item) => item.id !== payload.id)) ||
        [];
      payload.role = payload.role.toLowerCase() as
        | 'admin'
        | 'superadmin'
        | 'user';
      state.clients = [...(state.clients || []), payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.fulfilled, (state, { payload }) => {
        state.clients = payload;
      })
      .addCase(getAllClients.rejected, (state) => {
        state.clients = null;
      })
      .addCase(addClient.fulfilled, (state, { payload }) => {
        state.clients = [...(state.clients || []), payload];
      })
      .addCase(addClient.rejected, (state) => {
        state.clients = [...(state.clients || [])];
      })
      .addCase(removeClient.fulfilled, (state, { payload }) => {
        state.clients =
          state.clients && state.clients.filter((item) => item.id !== payload);
      })
      .addCase(removeClient.rejected, (state) => {
        state.clients = [...(state.clients || [])];
      });
  }
});

export const { reducer } = clientSlice;
export const { update: updateUser } = clientSlice.actions;
