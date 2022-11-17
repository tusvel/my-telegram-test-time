import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostService } from '@/services/post/post.service';

export const getAllPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await PostService.getAll();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
