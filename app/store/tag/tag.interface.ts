import { ITagResponse } from '@/shared/types/tag/tag-response.interface';

export interface ITagInitialState {
  items: ITagResponse[] | null;
  isLoading: boolean;
}
