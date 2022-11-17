import { createAsyncThunk } from '@reduxjs/toolkit';

import { PostService } from '@/services/post/post.service';

export const getAllPosts = createAsyncThunk(
  'PostService/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await PostService.getAll();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
