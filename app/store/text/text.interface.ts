import { IText } from '@/shared/types/text.interface';

export interface ITextInitialState {
  items: IText[] | null;
  isLoading: boolean;
}
