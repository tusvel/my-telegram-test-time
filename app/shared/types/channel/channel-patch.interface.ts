import { IBasic } from '@/shared/types/basic.interface';
import { MediaType } from '@/shared/types/media/media.type';

export interface IChannelPatchRequest extends IBasic {
  contact: string;
  media_type: MediaType;
  buttons_text: string;
}
