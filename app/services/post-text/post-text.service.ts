import { IPostTextCreate } from '@/shared/types/post-text/post-text-create.interface';
import { IPostTextPatch } from '@/shared/types/post-text/post-text-patch.interface';
import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import { getPostTextApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const PostTextService = {
  async getAll() {
    return await $auth.get<IPostTextResponse[]>(getPostTextApi(''));
  },

  async create(data: IPostTextCreate) {
    return await $auth.post<IPostTextResponse>(getPostTextApi(''), {
      data
    });
  },

  async update(data: IPostTextPatch) {
    return await $auth.patch<IPostTextResponse>(getPostTextApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<IPostTextResponse>(getPostTextApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getPostTextApi(`/${id}`));
  }
};
