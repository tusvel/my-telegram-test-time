import { createAsyncThunk } from '@reduxjs/toolkit';

import { TextService } from '@/services/text.service';

export const getAllTexts = createAsyncThunk(
  'texts/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await TextService.getAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
