import { IPostResponse } from '@/shared/types/post/post-response.interface';

export interface IPostInitialState {
  items: IPostResponse[] | null;
  isLoading: boolean;
}
