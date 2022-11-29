import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserCreate } from '@/shared/types/user/user-create.interface';
import { IUserResponse } from '@/shared/types/user/user-response.interface';

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

export const addClient = createAsyncThunk<IUserResponse, IUserCreate>(
  'UserService/create',
  async (data, thunkAPI) => {
    try {
      return await UserService.create(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeClient = createAsyncThunk<number, IUserResponse>(
  'UserService/delete',
  async (data, thunkAPI) => {
    try {
      await UserService.deleteOne(data.id);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
