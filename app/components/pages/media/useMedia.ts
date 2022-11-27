import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IMediaCreateRequest } from '@/shared/types/media/media-create.interface';

import { MediaService } from '@/services/media/media.service';

export const useCreateMedia: any = (save: any) => {
  const { mutateAsync } = useMutation(
    'Create text',
    (data: IMediaCreateRequest) => MediaService.create(data)
  );
  const [editor, setEditor] = useState();

  const onSubmit: SubmitHandler<IMediaCreateRequest> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit, setEditor };
};
