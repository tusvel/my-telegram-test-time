import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import { getAllTexts } from '@/store/text/text.actions';
import { ITextInitialState } from '@/store/text/text.interface';

const initialState: ITextInitialState = {
  items: null,
  isLoading: false
};

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    remove: (state, { payload }: PayloadAction<IPostTextResponse>) => {
      state.items =
        state.items?.filter((item) => {
          return item.id !== payload.id;
        }) || [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTexts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTexts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(getAllTexts.rejected, (state) => {
        state.items = null;
        state.isLoading = false;
      });
  }
});
export const { reducer } = textSlice;
export const { remove } = textSlice.actions;
