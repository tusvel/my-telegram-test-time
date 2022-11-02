import { createSlice } from '@reduxjs/toolkit';

import { getAllMedia } from '@/store/media/media.actions';
import { IMediaInitialState } from '@/store/media/media.interface';

const initialState: IMediaInitialState = {
  items: null,
  isLoading: false
};

export const mediaSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMedia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMedia.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoading = false;
      })
      .addCase(getAllMedia.rejected, (state) => {
        state.items = null;
        state.isLoading = false;
      });
  }
});
export const { reducer } = mediaSlice;
