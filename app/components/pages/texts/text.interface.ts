import { IPostTextCreate } from '@/shared/types/post-text/post-text-create.interface';

export interface ITextCreate extends IPostTextCreate {
  id: number;
  search_vertical?: string;
  search_tags?: string;
}
