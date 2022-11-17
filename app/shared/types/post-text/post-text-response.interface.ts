import { IBasic } from '@/shared/types/basic.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { ITagResponse } from '@/shared/types/tag/tag-response.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IPostTextResponse extends IBasic {
  channel_id: number;
  vertical: VerticalType;
  language: LanguageType;
  text: string;
  tags: ITagResponse[];
}
