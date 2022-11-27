import { IChannelSlotCreate } from '@/shared/types/channel/channel-slot/channel-slot-create.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IChannelCreateRequest extends IChannelSlotCreate {
  id: number;
  vertical: VerticalType;
  language: LanguageType;
  timezone: string;
  title: string;
  profice_picture: any;
  contact: string;
  is_preview: boolean;
  buttons_text: string;
}
