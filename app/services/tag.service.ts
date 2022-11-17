import { ITag } from '@/shared/types/tag/tag-create.interface';

import { getTagsUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const TagService = {
  async getAll() {
    const response = await $host.get<ITag[]>(getTagsUrl(''));
    return response.data;
  }
};
