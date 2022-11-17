import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { useSave } from '@/hooks/textEditor/useSave';

import { IButton } from '@/shared/types/button.interface';

import { PostService } from '@/services/post.service';

import { getStoreLocal } from '@/utils/local-storage';
import { saveButton } from '@/utils/save-button';
import { telegramConverter } from '@/utils/telegram-converter';

export const useCreatePost: any = (reset: any, setError: any) => {
  const { mutateAsync } = useMutation('Create post', (data: IPostInput) =>
    PostService.create(data)
  );
  const [editor, setEditor] = useState<any>();

  const onSubmit: SubmitHandler<IPostInput> = async (data) => {
    data.is_preview = !!data.is_preview;
    data.schedule_date = `${data.schedule_date} ${data.schedule_time}`;

    saveButton({ label: data.text_button, value: data.button_url });
    if (data.apply_button) {
      const item: IButton = getStoreLocal('buttons').find(
        (item: IButton) => item.value === data.value_button
      );
      data.text_button = item.label;
      data.button_url = item.value;
    }
    delete data.is_send_time;

    /*    const responseMedia = await MediaService.create(data.media);
    responseMedia.map((item) => item.url);
    data.media_id = [...data.media_id, ...responseMedia];*/
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
