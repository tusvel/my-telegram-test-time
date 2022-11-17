import { IPublishPostCreate } from '@/shared/types/publish-post/publish-post-create.interface';
import { IPublishPostResponse } from '@/shared/types/publish-post/publish-post-response.interface';

import { getPublishPostApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const PublishPostService = {
  async getAll() {
    const response = await $auth.get<IPublishPostResponse[]>(
      getPublishPostApi('')
    );
    return response.data;
  },

  async create(data: IPublishPostCreate) {
    const response = await $auth.post<IPublishPostResponse>(
      getPublishPostApi(''),
      {
        data
      }
    );
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IPublishPostResponse>(
      getPublishPostApi(`/${id}`)
    );
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getPublishPostApi(`/${id}`));
    return response.data;
  }
};
