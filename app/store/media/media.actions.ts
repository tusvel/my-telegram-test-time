import { createAsyncThunk } from '@reduxjs/toolkit';

import { MediaService } from '@/services/media/media.service';

export const getAllMedia = createAsyncThunk(
  'MediaService/getAll',
  async (_, thunkAPI) => {
    try {
      return await MediaService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
