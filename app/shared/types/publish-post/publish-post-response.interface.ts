import { IBasic } from '@/shared/types/basic.interface';
import { IChannelBase } from '@/shared/types/channel/channel-base.interface';
import { IMediaBase } from '@/shared/types/media/media-base.interface';

export interface IPublishPostResponse extends IBasic {
  channel_id: number;
  text: string;
  has_button: boolean;
  text_button: string;
  button_url: string;
  is_preview: boolean;
  schedule_date: Date | string;
  media: IMediaBase[];
  channel: IChannelBase;
}
