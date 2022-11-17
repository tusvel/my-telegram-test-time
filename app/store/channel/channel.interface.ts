import { IChannelBase } from '@/shared/types/channel/channel-response.interface';

export interface IChannelInitialState {
  items: IChannel[] | null;
  isLoading: boolean;
}
