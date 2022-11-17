import { IChannelResponse } from '@/shared/types/channel/channel-response.interface';

export interface IChannelInitialState {
  items: IChannelResponse[] | null;
  isLoading: boolean;
}
