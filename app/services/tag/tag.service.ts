import { ITagCreateRequest } from '@/shared/types/tag/tag-create.interface';
import { ITagPatchRequest } from '@/shared/types/tag/tag-patch.interface';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { getTagApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const TagService = {
  async getAll() {
    const response = await $auth.get<ITagResponse[]>(getTagApi(''));
    return response.data;
  },

  async create(data: ITagCreateRequest) {
    const response = await $auth.post<ITagResponse>(getTagApi(''), {
      data
    });
    return response.data;
  },

  async update(data: ITagPatchRequest) {
    const response = await $auth.patch<ITagResponse>(getTagApi(''), {
      data
    });
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<ITagResponse>(getTagApi(`/${id}`));
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getTagApi(`/${id}`));
    return response.data;
  }
};
