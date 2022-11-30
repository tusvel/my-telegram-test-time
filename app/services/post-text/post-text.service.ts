import { IPostTextCreate } from '@/shared/types/post-text/post-text-create.interface';
import { IPostTextPatch } from '@/shared/types/post-text/post-text-patch.interface';
import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import { getPostTextApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const PostTextService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 100) {
    const response = await $auth.get<IPostTextResponse[]>(getPostTextApi(''), {
      params: {
        offset_type,
        offset_id,
        limit
      }
    });
    return response.data;
  },

  async create(data: IPostTextCreate) {
    const response = await $auth.post<IPostTextResponse>(
      getPostTextApi(''),
      data
    );
    return response.data;
  },

  async update(data: IPostTextPatch) {
    const response = await $auth.patch<IPostTextResponse>(
      getPostTextApi(''),
      data
    );
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IPostTextResponse>(
      getPostTextApi(`/${id}`)
    );
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getPostTextApi(`/${id}`));
    return response.data;
  }
};
