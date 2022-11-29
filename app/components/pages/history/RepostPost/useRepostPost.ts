import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPostResponse } from '@/shared/types/post/post-response.interface';

import { PostService } from '@/services/post/post.service';

export const useRepostPost = (item: IPostResponse) => {
  const { mutateAsync } = useMutation('Post repost', (data: IPostResponse) =>
    PostService.repost(data, item.id)
  );

  const onEditSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    await mutateAsync(data);
  };

  return { onEditSubmit };
};
