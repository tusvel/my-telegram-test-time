import { IPostCreateRequest } from '@/shared/types/post/post-create.interface';

export interface ICreatePost extends IPostCreateRequest {
  media: any;
  schedule_time: Date;
  local_button: any;
}
