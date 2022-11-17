import { IChannelBase } from '@/shared/types/channel/channel-base.interface';
import { IChannelSlotResponse } from '@/shared/types/channel/channel-slot/channel-slot-response.interface';
import { IPostText } from '@/shared/types/post-text/post-text-create.interface';

export interface IChannelResponse extends IChannelBase {
  post_text: IPostText[];
  channel_slot: IChannelSlotResponse[];
}
