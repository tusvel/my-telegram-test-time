import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IMediaInput } from '@/pages/media/IMediaInput';

import { MediaService } from '@/services/media.service';

export const useMediaText: any = (save: any) => {
  const { mutateAsync } = useMutation('Create text', (data: IMediaInput) =>
    MediaService.create(data)
  );
  const [editor, setEditor] = useState();

  const onSubmit: SubmitHandler<IMediaInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit, setEditor };
};
