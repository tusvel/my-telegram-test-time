import { createAsyncThunk } from '@reduxjs/toolkit';

import { TagService } from '@/services/tag.service';

export const getAllTags = createAsyncThunk(
  'tags/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await TagService.getAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
