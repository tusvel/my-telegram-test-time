import { IText } from '@/shared/types/text.interface';
import { VerticalType } from '@/shared/types/vertical/vertical.types';

export interface ITextInput extends Pick<IText, 'id' | 'text' | 'language'> {
  tags_search: string[];
  tags: string[];
  vertical: VerticalType;
  channel_id: number;
}
