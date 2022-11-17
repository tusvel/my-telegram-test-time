import { IBasic } from '@/shared/types/basic.interface';
import { ITag } from '@/shared/types/tag/tag-create.interface';

export interface IChannelSlotRequest extends IBasic {
  interval: string;
  has_button: boolean;
  tags: ITag[];
  channel_id: number;
}
