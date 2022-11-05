import { ITag } from '@/shared/types/tag.interface';

import { getTagsUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const TagService = {
  async getAll() {
    const response = await $host.get<ITag[]>(getTagsUrl(''));
    return response.data;
  }
};
