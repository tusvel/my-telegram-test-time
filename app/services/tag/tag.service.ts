import { ITagCreateRequest } from '@/shared/types/tag/tag-create.interface';
import { ITagPatchRequest } from '@/shared/types/tag/tag-patch.interface';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

import { getTagApi } from '@/config/api.config';

import { $auth, $host } from '../../api/interceptors';

export const TagService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 10) {
    const response = await $auth.get<ITagResponse[]>(getTagApi('/'), {
      params: {
        offset_type,
        offset_id,
        limit
      }
    });
    return response.data;
  },

  async create(data: ITagCreateRequest) {
    const response = await $host.post<ITagResponse>(getTagApi('/'), data);
    return response.data;
  },

  async update(data: ITagPatchRequest) {
    const response = await $auth.patch<ITagResponse>(getTagApi(''), data);
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
