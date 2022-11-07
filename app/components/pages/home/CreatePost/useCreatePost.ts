import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { IButton } from '@/shared/types/button.interface';

import { PostService } from '@/services/post.service';

import { getStoreLocal } from '@/utils/local-storage';
import { saveButton } from '@/utils/save-button';
import { telegramConverter } from '@/utils/telegram-converter';

export const useCreatePost: any = (save: any, reset: any) => {
  const { mutateAsync } = useMutation('Create post', (data: IPostInput) =>
    PostService.create(data)
  );
  const [editor, setEditor] = useState();

  const onSubmit: SubmitHandler<IPostInput> = async (data) => {
    data.media_style = data.media_style !== 'false';
    data.schedule_date = `${data.schedule_date} ${data.schedule_time}`;

    saveButton({ label: data.text_button, value: data.button_url });
    if (data.apply_button) {
      const item: IButton = getStoreLocal('buttons').find(
        (item: IButton) => item.value === data.value_button
      );
      data.text_button = item.label;
      data.button_url = item.value;
    }

    /*    const responseMedia = await MediaService.create(data.media);
    responseMedia.map((item) => item.url);
    data.media = [...data.media.old_media, ...responseMedia];*/
    data.text = telegramConverter(save(editor), null, 'html') as string;
    console.log(data);
    await mutateAsync(data);
    reset();
  };

  return { onSubmit, setEditor };
};
