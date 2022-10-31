import { createSlice } from '@reduxjs/toolkit';

import { getAllChannels } from '@/store/channel/channel.actions';
import { IChannelInitialState } from '@/store/channel/channel.interface';

const initialState: IChannelInitialState = {
  items: null,
  isLoading: false
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChannels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllChannels.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(getAllChannels.rejected, (state) => {
        state.items = null;
        state.isLoading = false;
      });
  }
});
export const { reducer } = channelSlice;
