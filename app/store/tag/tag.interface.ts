import { ITag } from '@/shared/types/tag.interface';

export interface ITagInitialState {
  items: ITag[] | null;
  isLoading: boolean;
}
