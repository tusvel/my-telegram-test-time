import { ITag } from '@/shared/types/tag/tag-create.interface';

export interface ITagInitialState {
  items: ITag[] | null;
  isLoading: boolean;
}
