import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IPostTextPatch } from '@/shared/types/post-text/post-text-patch.interface';
import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

import { PostTextService } from '@/services/post-text/post-text.service';

export const useEditText = (clearTextItems: Function) => {
  const { items } = useTypedSelector((state) => state.textEdit);
  const { mutateAsync } = useMutation('Create text', (data: IPostTextPatch) =>
    PostTextService.update(data)
  );

  const onEditSubmit: SubmitHandler<IPostTextResponse> = async (data) => {
    // delete data.search_tags;
    // delete data.search_vertical;

    console.log(data);
    await mutateAsync(data);
    clearTextItems();
  };

  return { onEditSubmit };
};
