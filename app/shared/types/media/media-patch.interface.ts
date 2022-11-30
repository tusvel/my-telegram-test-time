import { IBasic } from '@/shared/types/basic.interface';
import { LanguageType } from '@/shared/types/language/language.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IMediaPatchRequest extends IBasic {
  tag_ids: number[];
  vertical: VerticalType;
  language: LanguageType;
  channel_id: number;
}
