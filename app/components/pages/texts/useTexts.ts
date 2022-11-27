import { $getRoot } from 'lexical';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextCreate } from '@/pages/texts/text.interface';

import { useSave } from '@/hooks/textEditor/useSave';

import { IPostTextCreate } from '@/shared/types/post-text/post-text-create.interface';

import { PostTextService } from '@/services/post-text/post-text.service';

import { telegramConverter } from '@/utils/telegram-converter';

export const useCreateText = (setError: any) => {
  const { mutateAsync } = useMutation('Create text', (data: IPostTextCreate) =>
    PostTextService.create(data)
  );
  const [editor, setEditor] = useState<any>();

  function clear(editor: any) {
    editor.update(() => {
      $getRoot().clear();
    });
  }

  const onSubmit: SubmitHandler<ITextCreate> = async (data) => {
    delete data.search_tags;
    delete data.search_vertical;
    data.channel_id && delete data.channel_id;

    data.text = telegramConverter(useSave(editor), null, 'html') as string;
    if (data.text?.length < 8) {
      return setError('text', { type: 'custom', message: 'Введите текст' });
    }

    console.log(data);
    await mutateAsync(data);
    clear(editor);
  };

  return { onSubmit, setEditor };
};
