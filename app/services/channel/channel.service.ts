import { IChannelCreateRequest } from '@/shared/types/channel/channel-create.interface';
import { IChannelPatchRequest } from '@/shared/types/channel/channel-patch.interface';
import { IChannelResponse } from '@/shared/types/channel/channel-response.interface';

import { getChannelApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const ChannelService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 100) {
    const response = await $auth.get<IChannelResponse[]>(getChannelApi(''), {
      params: {
        offset_type,
        offset_id,
        limit
      }
    });
    return response.data;
  },

  async create(data: IChannelCreateRequest) {
    const response = await $auth.post<IChannelResponse>(
      getChannelApi(''),
      data
    );
    return response.data;
  },

  async update(data: IChannelPatchRequest) {
    const response = await $auth.patch<IChannelResponse>(
      getChannelApi(''),
      data
    );
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IChannelResponse>(getChannelApi(`/${id}`));
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getChannelApi(`/${id}`));
    return response.data;
  }
};
