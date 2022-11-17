import { IPostTextResponse } from '../../shared/types/post-text/post-text-response.interface';

export interface ITextInitialState {
  items: IPostTextResponse[] | null;
  isLoading: boolean;
}
