import { IPostCreateRequest } from '@/shared/types/post/post-create.interface';
import { IPostResponse } from '@/shared/types/post/post-response.interface';

import { getPostApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const PostService = {
  async getAll() {
    return await $auth.get<IPostResponse[]>(getPostApi(''));
  },

  async create(data: IPostCreateRequest) {
    return await $auth.post<IPostResponse>(getPostApi(''), { data });
  },

  async getOne(id: number) {
    return await $auth.get<IPostResponse>(getPostApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getPostApi(`/${id}`));
  }
};
