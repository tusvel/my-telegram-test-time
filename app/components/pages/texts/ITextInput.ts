import { IText } from '@/shared/types/text.interface';

export interface ITextInput
  extends Pick<
    IText,
    'text' | 'tags' | 'channel' | 'language' | 'categories'
  > {}
