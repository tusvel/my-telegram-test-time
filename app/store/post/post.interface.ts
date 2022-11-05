import { IPost } from '@/shared/types/post.interface';

export interface IPostInitialState {
  items: IPost[] | null;
  isLoading: boolean;
}
