import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostTextService } from '@/services/post-text/post-text.service';

export const getAllTexts = createAsyncThunk(
  'PostTextService/getAll',
  async (_, thunkAPI) => {
    try {
      return await PostTextService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
