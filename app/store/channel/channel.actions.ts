import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChannelService } from '@/services/channel/channel.service';

export const getAllChannels = createAsyncThunk(
  'ChannelService/getAll',
  async (_, thunkAPI) => {
    try {
      return await ChannelService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
