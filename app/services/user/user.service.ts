import { IUserCreate } from '@/shared/types/user/user-create.interface';
import { IUserPatch } from '@/shared/types/user/user-patch.interface';
import { IUserResponse } from '@/shared/types/user/user-response.interface';

import { getUserApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const UserService = {
  async getAll() {
    return await $auth.get<IUserResponse[]>(getUserApi(''));
  },

  async create(data: IUserCreate) {
    return await $auth.post<IUserResponse>(getUserApi(''), {
      data
    });
  },

  async update(data: IUserPatch) {
    return await $auth.patch<IUserResponse>(getUserApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<IUserResponse>(getUserApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getUserApi(`/${id}`));
  }
};
