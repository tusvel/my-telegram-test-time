import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChannelService } from '@/services/channel/channel.service';

export const getAllChannels = createAsyncThunk(
  'channel/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await ChannelService.getAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
