import { IBasic } from '@/shared/types/basic.interface';
import { IChannelBase } from '@/shared/types/channel/channel-base.interface';
import { ITag } from '@/shared/types/tag/tag-create.interface';

export interface IChannelSlotResponse extends IBasic {
  interval: string;
  has_button: boolean;
  tags: ITag[];
  channel: IChannelBase;
}
