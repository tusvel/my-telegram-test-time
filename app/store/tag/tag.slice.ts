import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { getAllTags } from '@/store/tag/tag.actions';
import { ITagInitialState } from '@/store/tag/tag.interface';

const initialState: ITagInitialState = {
  items: null,
  isLoading: false
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<ITagResponse>) => {
      state.items = [...(state.items || []), payload];
    },
    remove: (state, { payload }: PayloadAction<ITagResponse>) => {
      state.items =
        state.items && state.items.filter((item) => item.id !== payload.id);
    },
    update: (state, { payload }: PayloadAction<ITagResponse>) => {
      state.items = state.items?.filter((item) => item.id !== payload.id) || [];
      state.items = [...(state.items || []), payload];
    }
  },
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
export const {
  add: addTag,
  remove: removeTag,
  update: updateTag
} = tagSlice.actions;
