import { $getRoot } from 'lexical';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useSave } from '@/hooks/textEditor/useSave';

import { IPostTextCreate } from '@/shared/types/post-text/post-text-create.interface';
import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

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

  const onSubmit: SubmitHandler<IPostTextResponse> = async (data) => {
    // delete data.search_tags;
    // delete data.search_vertical;

    data.text = telegramConverter(useSave(editor), null, 'html') as string;
    if (data.text?.length < 8) {
      return setError('text', { type: 'custom', message: 'Введите текст' });
    }

    console.log(data);
    await mutateAsync({
      text: data.text,
      tag_ids: data.tag_ids,
      channel_id: data.channel_id,
      language: data.language,
      vertical: data.vertical
    });
    clear(editor);
  };

  return { onSubmit, setEditor };
};
