import { ITagCreateRequest } from '@/shared/types/tag/tag-create.interface';
import { ITagPatchRequest } from '@/shared/types/tag/tag-patch.interface';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { getTagApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const TagService = {
  async getAll() {
    return await $auth.get<ITagResponse[]>(getTagApi(''));
  },

  async create(data: ITagCreateRequest) {
    return await $auth.post<ITagResponse>(getTagApi(''), {
      data
    });
  },

  async update(data: ITagPatchRequest) {
    return await $auth.patch<ITagResponse>(getTagApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<ITagResponse>(getTagApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getTagApi(`/${id}`));
  }
};
