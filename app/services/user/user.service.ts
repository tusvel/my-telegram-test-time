import { IUserCreate } from '@/shared/types/user/user-create.interface';
import { IUserPatch } from '@/shared/types/user/user-patch.interface';
import { IUserResponse } from '@/shared/types/user/user-response.interface';

import { getUserApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const UserService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 10) {
    const response = await $auth.get<IUserResponse[]>(getUserApi(''), {
      params: {
        offset_type,
        offset_id,
        limit
      }
    });
    return response.data;
  },

  async create(data: IUserCreate) {
    const response = await $auth.post<IUserResponse>(getUserApi(''), data);
    return response.data;
  },

  async update(data: IUserPatch) {
    const response = await $auth.patch<IUserResponse>(getUserApi(''), data);
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IUserResponse>(getUserApi(`/${id}`));
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getUserApi(`/${id}`));
    return response.data;
  },

  async getMe() {
    const response = await $auth.get<IUserResponse>(getUserApi('/me'));
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }
};
