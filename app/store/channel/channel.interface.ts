import { IChannel } from '@/shared/types/channel.interface';

export interface IChannelInitialState {
  items: IChannel[] | null;
  isLoading: boolean;
}
