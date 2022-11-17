import { IChannelBase } from '@/shared/types/channel/channel-response.interface';

export interface IChannelInput extends Omit<IChannel, 'id'> {
  id_channel: string;
}
