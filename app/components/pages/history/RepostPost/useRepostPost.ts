import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { IText } from '@/shared/types/text.interface';

import { PostService } from '@/services/post.service';

export const useRepostPost = (item: IText) => {
  const { mutateAsync } = useMutation('Post repost', (data: ITextInput) =>
    PostService.repost(data, item.id)
  );

  const onEditSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    await mutateAsync(data);
  };

  return { onEditSubmit };
};
