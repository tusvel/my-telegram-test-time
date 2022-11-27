import { createSlice } from '@reduxjs/toolkit';

import { getAllClients } from '@/store/client/client.actions';
import { IClientInitialState } from '@/store/client/client.interface';

const initialState: IClientInitialState = {
  clients: null,
  isLoading: false
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClients.fulfilled, (state, { payload }) => {
        state.clients = payload;
        state.isLoading = false;
      })
      .addCase(getAllClients.rejected, (state) => {
        state.clients = null;
        state.isLoading = false;
      });
  }
});

export const { reducer } = clientSlice;
