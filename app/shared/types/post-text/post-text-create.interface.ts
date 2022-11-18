import { LanguageType } from '@/shared/types/language/language.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IPostTextCreate {
  vertical: VerticalType;
  language: LanguageType;
  text: string;
  tags: number[];
  channel_id?: number;
}
