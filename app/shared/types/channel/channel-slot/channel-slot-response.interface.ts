import { IBasic } from '@/shared/types/basic.interface';
import { IChannelBase } from '@/shared/types/channel/channel-base.interface';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

export interface IChannelSlotResponse extends IBasic {
  interval: string;
  has_button: boolean;
  tags: ITagResponse[];
  channel: IChannelBase;
}
