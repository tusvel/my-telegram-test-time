import { IMedia } from '@/shared/types/media/media.interface';

export interface IMediaInput extends Omit<IMedia, 'id'> {}
