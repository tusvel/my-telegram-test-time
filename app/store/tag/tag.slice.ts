import { createSlice } from '@reduxjs/toolkit';

import { getAllTags } from '@/store/tag/tag.actions';
import { ITagInitialState } from '@/store/tag/tag.interface';

const initialState: ITagInitialState = {
  items: null,
  isLoading: false
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTags.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(getAllTags.rejected, (state) => {
        state.items = null;
        state.isLoading = false;
      });
  }
});
export const { reducer } = tagSlice;
