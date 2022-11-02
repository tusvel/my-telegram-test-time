import { IText } from '@/shared/types/text.interface';

import { getTextsUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const TextService = {
  async getAll() {
    const response = await $host.get<IText[]>(getTextsUrl(''));
    return response.data;
  }
};