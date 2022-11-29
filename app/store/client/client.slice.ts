import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
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
