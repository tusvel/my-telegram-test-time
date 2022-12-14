import { IPostCreateRequest } from '@/shared/types/post/post-create.interface';
import { IPostResponse } from '@/shared/types/post/post-response.interface';

import { getPostApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const PostService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 100) {
    const response = await $auth.get<IPostResponse[]>(getPostApi(''), {
      params: {
        offset_type,
        offset_id,
        limit
      }
    });
    return response.data;
  },

  async create(data: IPostCreateRequest) {
    const response = await $auth.post<IPostResponse>(getPostApi(''), data);
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IPostResponse>(getPostApi(`/${id}`));
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getPostApi(`/${id}`));
    return response.data;
  },
  repost(data: any, id: any) {
    return Promise.resolve(undefined);
  }
};
