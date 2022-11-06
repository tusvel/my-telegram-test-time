import { IChannel } from '@/shared/types/channel.interface';

export interface IChannelInput extends Omit<IChannel, 'id'> {
  id_channel: string;
}
