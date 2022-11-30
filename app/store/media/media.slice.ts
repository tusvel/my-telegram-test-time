import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IMediaResponse } from '@/shared/types/media/media-response.interface';

import { getAllMedia } from '@/store/media/media.actions';
import { IMediaInitialState } from '@/store/media/media.interface';

const initialState: IMediaInitialState = {
  items: null,
  isLoading: false
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<IMediaResponse>) => {
      state.items = [...(state.items || []), payload];
    },
    remove: (state, { payload }: PayloadAction<IMediaResponse>) => {
      state.items =
        state.items && state.items.filter((item) => item.id !== payload.id);
    },
    update: (state, { payload }: PayloadAction<IMediaResponse>) => {
      state.items =
        state.items && state.items.filter((item) => item.id !== payload.id);
      state.items = [...(state.items || []), payload];
    }
  },
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
export const {
  add: addMedia,
  remove: removeMedia,
  update: updateMedia
} = mediaSlice.actions;
