import { IMedia } from '@/shared/types/media.interface';

import { getMediasUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const MediaService = {
  async getAll() {
    const response = await $host.get<IMedia[]>(getMediasUrl(''));
    return response.data;
  }
};
