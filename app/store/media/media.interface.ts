import { IMediaResponse } from '@/shared/types/media/media-response.interface';

export interface IMediaInitialState {
  items: IMediaResponse[] | null;
  isLoading: boolean;
}
