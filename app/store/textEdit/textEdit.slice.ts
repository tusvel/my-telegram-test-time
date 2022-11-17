import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import { ITextInitialState } from '@/store/text/text.interface';

const initialState: ITextInitialState = {
  items: null,
  isLoading: false
};

export const textEditSlice = createSlice({
  name: 'textEdit',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<IPostTextResponse>) => {
      state.items = [...(state.items || []), payload];
    },
    remove: (state, { payload }: PayloadAction<IPostTextResponse>) => {
      state.items =
        state.items?.filter((item) => {
          return item.id !== payload.id;
        }) || [];
    },
    clear: (state) => {
      state.items = null;
    }
  }
});
export const { reducer } = textEditSlice;
export const { add, remove, clear } = textEditSlice.actions;
