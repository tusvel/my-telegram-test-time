import { IText } from '@/shared/types/text.interface';

export interface ITextInput
  extends Pick<
    IText,
    'id' | 'text' | 'tags' | 'channel' | 'language' | 'categories'
  > {}
