import { IChannelSlotCreate } from '@/shared/types/channel/channel-slot/channel-slot-create.interface';
import { IChannelSlotResponse } from '@/shared/types/channel/channel-slot/channel-slot-response.interface';

import { getChannelSlotApi } from '@/config/api.config';

import { $auth } from '../../api/interceptors';

export const ChannelSlotService = {
  async getAll(offset_type = 'first', offset_id = 0, limit = 100) {
    const response = await $auth.get<IChannelSlotResponse[]>(
      getChannelSlotApi(''),
      {
        params: {
          offset_type,
          offset_id,
          limit
        }
      }
    );
    return response.data;
  },

  async create(data: IChannelSlotCreate) {
    const response = await $auth.post<IChannelSlotResponse>(
      getChannelSlotApi(''),
      data
    );
    return response.data;
  },

  async getOne(id: number) {
    const response = await $auth.get<IChannelSlotResponse>(
      getChannelSlotApi(`/${id}`)
    );
    return response.data;
  },

  async deleteOne(id: number) {
    const response = await $auth.delete(getChannelSlotApi(`/${id}`));
    return response.data;
  }
};
