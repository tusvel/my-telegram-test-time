import { IText } from '@/shared/types/text.interface';

export interface ITextInput
  extends Pick<IText, 'id' | 'text' | 'channel' | 'language' | 'categories'> {
  tags_search: string[];
  tags: string[];
}
