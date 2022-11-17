import { IMediaCreateRequest } from '@/shared/types/media/media-create.interface';
import { IMediaPatchRequest } from '@/shared/types/media/media-patch.interface';
import { IMediaResponse } from '@/shared/types/media/media-response.interface';

import { getMediaApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const MediaService = {
  async getAll() {
    return await $auth.get<IMediaResponse[]>(getMediaApi(''));
  },

  async create(data: IMediaCreateRequest) {
    return await $auth.post<IMediaResponse>(getMediaApi(''), {
      data
    });
  },

  async update(data: IMediaPatchRequest) {
    return await $auth.patch<IMediaResponse>(getMediaApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<IMediaResponse>(getMediaApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getMediaApi(`/${id}`));
  }
};
