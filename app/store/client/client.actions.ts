import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '@/services/user/user.service';

export const getAllClients = createAsyncThunk(
  'UserService/getAll',
  async (_, thunkAPI) => {
    try {
      return await UserService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
