import { IChannelInput } from '@/pages/channels/IChannelInput';

import { IChannel } from '@/shared/types/channel.interface';

import { getChannelsUrl } from '@/config/api.config';

import { $host } from '../api/interceptors';

export const ChannelService = {
  async getAll() {
    const response = await $host.get<IChannel[]>(getChannelsUrl(''));
    return response.data;
  },
  async create(data: IChannelInput) {
    return 123;
  }
};
