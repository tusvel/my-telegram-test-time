import { IBasic } from '@/shared/types/basic.interface';
import { IChannel } from '@/shared/types/channel.interface';

export interface IPost extends IBasic {
  channel?: IChannel;
  text: string;
  has_button: boolean;
  text_button: string;
  button_url: string;
  media_id: [string];
  is_preview: string | boolean;
  schedule_date: Date | string;
  is_publisched: boolean;
}
