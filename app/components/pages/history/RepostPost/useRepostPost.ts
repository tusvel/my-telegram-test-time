import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPost } from '@/shared/types/post/post-create.interface';

import { PostService } from '@/services/post.service';

export const useRepostPost = (item: IPost) => {
  const { mutateAsync } = useMutation('Post repost', (data: IPost) =>
    PostService.repost(data, item.id)
  );

  const onEditSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    await mutateAsync(data);
  };

  return { onEditSubmit };
};
