import { createAsyncThunk } from '@reduxjs/toolkit';

import { TagService } from '@/services/tag/tag.service';

export const getAllTags = createAsyncThunk(
  'TagService/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await TagService.getAll();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
