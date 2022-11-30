import { LanguageType } from '@/shared/types/language/language.type';
import { MediaType } from '@/shared/types/media/media.type';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface IMediaCreateRequest {
  type: MediaType;
  vertical: VerticalType;
  language: LanguageType;
  tag_ids: number[];
  url: string;
  channel_id: number;
}
