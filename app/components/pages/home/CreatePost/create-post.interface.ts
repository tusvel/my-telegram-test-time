import { IPost } from '@/shared/types/post.interface';

export interface IPostInput extends Omit<IPost, 'id' | 'is_publisched'> {
  apply_button: string;
  value_button: string;
  schedule_time: string[];
  is_send_time?: boolean;
}
