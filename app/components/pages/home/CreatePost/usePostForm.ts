import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ICreatePost } from '@/pages/home/CreatePost/create-post.interface';

import { useSave } from '@/hooks/textEditor/useSave';

import { IButton } from '@/shared/types/form/button.interface';

import { MediaService } from '@/services/media/media.service';
import { PostService } from '@/services/post/post.service';

import { getStoreLocal } from '@/utils/local-storage';
import { saveButton } from '@/utils/save-button';
import { telegramConverter } from '@/utils/telegram-converter';
import { useTimeZone } from '@/utils/timezone';

export const usePostForm: any = (
  reset: any,
  setError: any,
  applyButton: boolean
) => {
  const { mutateAsync } = useMutation('Create post', (data: ICreatePost) =>
    PostService.create(data)
  );
  const [editor, setEditor] = useState<any>();

  const onSubmit: SubmitHandler<ICreatePost> = async (data) => {
    //работа с датой
    if (data.schedule_date && data.schedule_time) {
      data.schedule_date = useTimeZone(data.schedule_date, data.schedule_time);
      console.log(data.schedule_date);
      delete data.schedule_time;
    } else {
      delete data.schedule_date;
      delete data.schedule_time;
    }
    //-------------

    //Работа с кнопками
    saveButton({ label: data.text_button, value: data.button_url });
    if (applyButton) {
      const item: IButton = getStoreLocal('buttons').find(
        (item: IButton) => item.value === data.local_button
      );
      data.text_button = item.label;
      data.button_url = item.value;
    }
    delete data.local_button;
    //---------------

    //работа с медиа
    let responseMedias = [];
    for (let i = 0; i < data.media; i++) {
      const responseMedia = await MediaService.create(data.media);
      responseMedias.push(responseMedia.url);
    }
    data.media_id = [...(data?.media_id || []), ...responseMedias];
    delete data.media;
    //-----------

    data.text = telegramConverter(useSave(editor), null, 'html') as string;
    if (data.text?.length < 8) {
      return setError('text', { type: 'custom', message: 'Введите текст' });
    }

    console.log(data);
    await mutateAsync(data);
    reset();
  };

  return { onSubmit, setEditor };
};
