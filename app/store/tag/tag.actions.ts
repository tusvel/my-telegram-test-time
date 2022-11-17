import { createAsyncThunk } from '@reduxjs/toolkit';

import { TagService } from '@/services/tag/tag.service';

export const getAllTags = createAsyncThunk(
  'TagService/getAll',
  async (_, thunkAPI) => {
    try {
      return await TagService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
