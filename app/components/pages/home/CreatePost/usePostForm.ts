import { $getRoot } from 'lexical';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ICreatePost } from '@/pages/home/CreatePost/create-post.interface';

import { useSave } from '@/hooks/textEditor/useSave';

import { IButton } from '@/shared/types/form/button.interface';
import { MediaType } from '@/shared/types/media/media.type';

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
  const [myFiles, setMyFiles] = useState([]);

  const { mutateAsync } = useMutation('Create post', (data: ICreatePost) =>
    PostService.create(data)
  );
  const [editor, setEditor] = useState<any>();

  const onSubmit: SubmitHandler<ICreatePost> = async (data) => {
    //работа с датой
    if (data.schedule_date && data.schedule_time) {
      data.schedule_date = useTimeZone(data.schedule_date, data.schedule_time);
      delete data.schedule_time;
    } else {
      delete data.schedule_date;
      delete data.schedule_time;
    }
    //-------------

    //Работа с кнопками
    saveButton({ label: data.button_text, value: data.button_url });
    if (applyButton) {
      const item: IButton = getStoreLocal('buttons').find(
        (item: IButton) => item.value === data.local_button
      );
      data.button_text = item.label;
      data.button_url = item.value;
    }
    delete data.local_button;
    //---------------

    data.text = telegramConverter(useSave(editor), null, 'html') as string;
    if (data.text?.length < 8) {
      return setError('text', { type: 'custom', message: 'Введите текст' });
    }

    const promises =
      data.media?.length &&
      data.media.map(async (item: Blob) => {
        const formData = new FormData();
        formData.append('file', item);
        const picture = await MediaService.upload(formData);
        const format = picture.path.split('.')[2];
        let type: MediaType = 'photo';
        if (format === 'mp4') {
          type = 'video';
        } else if (format === 'jpg') {
          type = 'photo';
        }
        const media = await MediaService.create({
          url: picture.path,
          type: type,
          is_single_used: true
        });
        data.media_id = [...(data.media_id || []), media.id];
      });

    delete data.media;

    await Promise.all(promises).then(async (res) => {
      await mutateAsync(data);
      reset();
    });

    editor.update(() => {
      $getRoot().clear();
    });
    setMyFiles([]);
  };

  return { onSubmit, setEditor, myFiles, setMyFiles };
};
