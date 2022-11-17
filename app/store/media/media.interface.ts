import { IMedia } from '@/shared/types/media/media.interface';

export interface IMediaInitialState {
  items: IMedia[] | null;
  isLoading: boolean;
}
