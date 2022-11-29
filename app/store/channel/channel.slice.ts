import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IChannelResponse } from '@/shared/types/channel/channel-response.interface';

import { getAllChannels } from '@/store/channel/channel.actions';
import { IChannelInitialState } from '@/store/channel/channel.interface';

const initialState: IChannelInitialState = {
  items: null,
  isLoading: false
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<IChannelResponse>) => {
      state.items = [...(state.items || []), payload];
    },
    remove: (state, { payload }: PayloadAction<IChannelResponse>) => {
      state.items =
        state.items && state.items.filter((item) => item.id !== payload.id);
    }
  },
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
export const { add: addChannel, remove: removeChannel } = channelSlice.actions;
