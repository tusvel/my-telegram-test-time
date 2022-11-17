import { IUserCreate } from '@/shared/types/user/user-create.interface';
import { IUserPatch } from '@/shared/types/user/user-patch.interface';
import { IUserResponse } from '@/shared/types/user/user-response.interface';

import { getUserApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const UserService = {
  async getAll() {
    const response = await $auth.get<IUserResponse[]>(getUserApi(''));
    return response.data;
  },

  async create(data: IUserCreate) {
    const response = await $auth.post<IUserResponse>(getUserApi(''), {
      data
    });
    return response.data;
  },

  async update(data: IUserPatch) {
    const response = await $auth.patch<IUserResponse>(getUserApi(''), {
      data
    });
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IUserResponse>(getUserApi(`/${id}`));
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getUserApi(`/${id}`));
    return response.data;
  }
};
