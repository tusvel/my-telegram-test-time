import { LanguageType } from '@/shared/types/language/language.type';
import { MediaType } from '@/shared/types/media/media.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IMediaCreateRequest {
  type: MediaType;
  url: string;
  is_single_used: boolean;
  vertical?: VerticalType;
  language?: LanguageType;
  tag_ids?: number[];
  channel_id?: number;
}
