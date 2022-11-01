import { IBasic } from '@/shared/types/basic.interface';
import { IChannel } from '@/shared/types/channel.interface';
import { IMedia } from '@/shared/types/media.interface';

export interface IPost extends IBasic {
  channel: IChannel;
  text: string;
  has_button: boolean;
  text_button: string;
  button_url: string;
  media: IMedia[];
  media_style: string | boolean;
  schedule_date: any; //TODO
  is_published: boolean;
}
