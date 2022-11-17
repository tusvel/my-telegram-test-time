import { $getRoot } from 'lexical';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { useSave } from '@/hooks/textEditor/useSave';

import { TextService } from '@/services/text.service';

import { telegramConverter } from '@/utils/telegram-converter';

export const useCreateText: any = (setError: any) => {
  const { mutateAsync } = useMutation('Create text', (data: ITextInput) =>
    TextService.create(data)
  );
  const [editor, setEditor] = useState<any>();

  function clear(editor: any) {
    editor.update(() => {
      $getRoot().clear();
    });
  }

  const onSubmit: SubmitHandler<ITextInput> = async (data) => {
    if (data.channel === undefined) {
      delete data.channel;
    }

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
