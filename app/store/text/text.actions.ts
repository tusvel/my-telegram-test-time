import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostTextService } from '@/services/post-text/post-text.service';

export const getAllTexts = createAsyncThunk(
  'PostTextService/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await PostTextService.getAll();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
