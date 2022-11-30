import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useAppDispatch } from '@/hooks/useAppDispatch';

import { IMediaCreateRequest } from '@/shared/types/media/media-create.interface';

import { MediaService } from '@/services/media/media.service';

import { addMedia } from '@/store/media/media.slice';

export const useCreateMedia: any = (save: any) => {
  const { mutateAsync } = useMutation(
    'Create text',
    (data: IMediaCreateRequest) => MediaService.create(data)
  );
  const dispatch = useAppDispatch();
  const [editor, setEditor] = useState();

  const onSubmit: SubmitHandler<
    IMediaCreateRequest & { profile_picture: any[] }
  > = async (data) => {
    try {
      data.profile_picture.map(async (item) => {
        const formData = new FormData();
        formData.append('file', item);
        const picture = await MediaService.upload(formData);
        const channelRes = await mutateAsync({
          url: picture.path,
          tag_ids: data.tag_ids,
          channel_id: data.channel_id,
          language: data.language,
          type: data.type,
          vertical: data.vertical
        });
        dispatch(addMedia(channelRes));
      });
    } catch (e) {
      console.log(e);
    }
  };

  return { onSubmit, setEditor };
};
