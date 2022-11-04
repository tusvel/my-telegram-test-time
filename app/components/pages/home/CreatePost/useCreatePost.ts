import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { save } from '@/components/ui/TextEditor/plugins/SaveAsHtmlPlugin';

import { IButton } from '@/shared/types/button.interface';

import { MediaService } from '@/services/media.service';
import { PostService } from '@/services/post.service';

import { getStoreLocal } from '@/utils/local-storage';
import { saveButton } from '@/utils/save-button';
import { telegramConverter } from '@/utils/telegram-converter';

export const useCreatePost = () => {
  const { mutateAsync } = useMutation('Create post', (data: IPostInput) =>
    PostService.create(data)
  );

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

    const responseMedia = await MediaService.create(data.media);
    responseMedia.map((item) => item.url);
    data.media = [...data.media.old_media, ...responseMedia];
    data.text = telegramConverter(save(), null, 'html') as string;

    await mutateAsync(data);
  };

  return { onSubmit };
};
