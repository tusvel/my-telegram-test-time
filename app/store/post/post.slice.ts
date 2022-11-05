import { createSlice } from '@reduxjs/toolkit';

import { getAllPosts } from '@/store/post/post.actions';
import { IPostInitialState } from '@/store/post/post.interface';

const initialState: IPostInitialState = {
  items: null,
  isLoading: false
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.items = null;
        state.isLoading = false;
      });
  }
});
export const { reducer } = postSlice;
