import { IBasic } from '@/shared/types/basic.interface';
import { IChannel } from '@/shared/types/channel.interface';

export interface IPost extends IBasic {
  channel: IChannel;
  text: string;
  has_button: boolean;
  text_button: string;
  button_url: string;
  media: [any]; //TODO
  old_media: string; //TODO
  media_style: string | boolean;
  schedule_date: Date | string;
  schedule_time: Date;
  send_time: boolean;
  is_published: boolean;
  apply_button: string;
  value_button: string;
}
