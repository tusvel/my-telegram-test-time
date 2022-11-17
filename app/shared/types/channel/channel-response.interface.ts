import { IChannelBase } from '@/shared/types/channel/channel-base.interface';
import { IChannelSlotResponse } from '@/shared/types/channel/channel-slot/channel-slot-response.interface';
import { IPostTextCreate } from '@/shared/types/post-text/post-text-create.interface';

export interface IChannelResponse extends IChannelBase {
  post_text: IPostTextCreate[];
  channel_slot: IChannelSlotResponse[];
}
