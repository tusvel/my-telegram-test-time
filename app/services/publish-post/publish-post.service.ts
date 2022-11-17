import { IPublishPostCreate } from '@/shared/types/publish-post/publish-post-create.interface';
import { IPublishPostResponse } from '@/shared/types/publish-post/publish-post-response.interface';

import { getPublishPostApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const PublishPostService = {
  async getAll() {
    return await $auth.get<IPublishPostResponse[]>(getPublishPostApi(''));
  },

  async create(data: IPublishPostCreate) {
    return await $auth.post<IPublishPostResponse>(getPublishPostApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<IPublishPostResponse>(getPublishPostApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getPublishPostApi(`/${id}`));
  }
};
