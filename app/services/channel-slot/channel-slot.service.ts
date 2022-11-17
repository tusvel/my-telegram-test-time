import { IChannelSlotCreate } from '@/shared/types/channel/channel-slot/channel-slot-create.interface';
import { IChannelSlotResponse } from '@/shared/types/channel/channel-slot/channel-slot-response.interface';

import { getChannelSlotApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const ChannelSlotService = {
  async getAll() {
    return await $auth.get<IChannelSlotResponse[]>(getChannelSlotApi(''));
  },

  async create(data: IChannelSlotCreate) {
    return await $auth.post<IChannelSlotResponse>(getChannelSlotApi(''), {
      data
    });
  },

  async getOne(id: number) {
    return await $auth.get<IChannelSlotResponse>(getChannelSlotApi(`/${id}`));
  },

  async deleteOne(id: number) {
    return await $auth.delete(getChannelSlotApi(`/${id}`));
  }
};
