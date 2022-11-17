import { IPost } from '@/shared/types/post/post-create.interface';

export interface IPostInitialState {
  items: IPost[] | null;
  isLoading: boolean;
}
