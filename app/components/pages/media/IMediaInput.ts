import { IMedia } from '@/shared/types/media.interface';

export interface IMediaInput extends Omit<IMedia, 'id'> {}
