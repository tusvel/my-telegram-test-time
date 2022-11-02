import { createAsyncThunk } from '@reduxjs/toolkit';

import { MediaService } from '@/services/media.service';

export const getAllMedia = createAsyncThunk(
  'media/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await MediaService.getAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
