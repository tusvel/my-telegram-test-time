import { IBasic } from '@/shared/types/basic.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IPostTextPatch extends IBasic {
  tags: number[];
  vertical: VerticalType;
  language: LanguageType;
  text: string;
  channel_id?: number;
}
