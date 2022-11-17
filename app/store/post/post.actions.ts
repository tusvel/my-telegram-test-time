import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostService } from '@/services/post/post.service';

export const getAllPosts = createAsyncThunk(
  'PostService/getAll',
  async (_, thunkAPI) => {
    try {
      return await PostService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
