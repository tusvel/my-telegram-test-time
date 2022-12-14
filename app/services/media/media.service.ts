import { IMediaCreateRequest } from '@/shared/types/media/media-create.interface';
import { IMediaPatchRequest } from '@/shared/types/media/media-patch.interface';
import { IMediaResponse } from '@/shared/types/media/media-response.interface';

import { getMediaApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const MediaService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 100) {
    const response = await $auth.get<IMediaResponse[]>(getMediaApi(''), {
      params: {
        offset_type,
        offset_id,
        limit
      }
    });
    return response.data;
  },

  async create(data: IMediaCreateRequest) {
    const response = await $auth.post<IMediaResponse>(getMediaApi(''), data);
    return response.data;
  },

  async upload(file: FormData) {
    const response = await $auth.post<{ path: string }>(
      getMediaApi('/upload'),
      file,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return response.data;
  },

  async update(data: IMediaPatchRequest) {
    const response = await $auth.patch<IMediaResponse>(getMediaApi(''), data);
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IMediaResponse>(getMediaApi(`/${id}`));
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getMediaApi(`/${id}`));
    return response.data;
  }
};
