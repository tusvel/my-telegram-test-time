import { IBasic } from '@/shared/types/basic.interface';

export interface IChannelSlotCreate extends IBasic {
  interval: string;
  has_button: boolean;
  tags: number[];
  channel_id: number;
}
