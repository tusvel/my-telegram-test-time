import { createAsyncThunk } from '@reduxjs/toolkit';

import { MediaService } from '@/services/media/media.service';

export const getAllMedia = createAsyncThunk(
  'MediaService/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await MediaService.getAll();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
