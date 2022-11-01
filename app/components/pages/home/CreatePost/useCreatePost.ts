import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { PostService } from '@/services/post.service';

export const useCreatePost = () => {
  const { mutateAsync } = useMutation('Create post', (data: IPostInput) =>
    PostService.create(data)
  );

  const onSubmit: SubmitHandler<IPostInput> = async (data) => {
    data.media_style = data.media_style !== 'false';
    console.log(data);
    await mutateAsync(data);
  };

  return { onSubmit };
};
