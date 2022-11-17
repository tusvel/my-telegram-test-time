import { IBasic } from '@/shared/types/basic.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IChannelBase extends IBasic {
  vertical: VerticalType;
  language: LanguageType;
  timezone: Date;
  title: string;
  profice_picture: string;
  contact: string;
  is_preview: boolean;
  buttons_text: string;
}
