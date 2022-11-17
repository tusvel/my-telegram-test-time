import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface ITextInput
  extends Pick<IPostTextResponse, 'id' | 'text' | 'language'> {
  tags_search: string[];
  tags: string[];
  vertical: VerticalType;
  channel_id: number;
}
