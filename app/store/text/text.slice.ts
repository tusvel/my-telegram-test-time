import { createSlice } from '@reduxjs/toolkit';

import { getAllTexts } from '@/store/text/text.actions';
import { ITextInitialState } from '@/store/text/text.interface';

const initialState: ITextInitialState = {
  items: null,
  isLoading: false
};

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {},
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
