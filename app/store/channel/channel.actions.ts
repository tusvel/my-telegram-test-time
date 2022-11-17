import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChannelService } from '@/services/channel/channel.service';

export const getAllChannels = createAsyncThunk(
  'ChannelService/getAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await ChannelService.getAll();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
