import { IPost } from '@/shared/types/post.interface';

export interface IPostInput extends Omit<IPost, 'id'> {}
