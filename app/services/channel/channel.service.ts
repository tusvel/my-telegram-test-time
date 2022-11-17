import { IChannelCreateRequest } from '@/shared/types/channel/channel-create.interface';
import { IChannelPatchRequest } from '@/shared/types/channel/channel-patch.interface';
import { IChannelResponse } from '@/shared/types/channel/channel-response.interface';

import { getChannelApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const ChannelService = {
  async getAll() {
    return await $auth.get<IChannelResponse[]>(getChannelApi(''));
  },

  async create(data: IChannelCreateRequest) {
    return await $auth.post<IChannelResponse>(getChannelApi(''), {
      data
    });
  },

  async update(data: IChannelPatchRequest) {
    return await $auth.patch<IChannelResponse>(getChannelApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<IChannelResponse>(getChannelApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getChannelApi(`/${id}`));
  }
};
