import { IBasic } from '@/shared/types/basic.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { MediaType } from '@/shared/types/media/media.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IMediaBase extends IBasic {
  type: MediaType;
  vertical: VerticalType;
  language: LanguageType;
  url: string;
}
