import { $getRoot } from 'lexical';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { TextService } from '@/services/text.service';

import { telegramConverter } from '@/utils/telegram-converter';

export const useCreateText: any = (save: any) => {
  const { mutateAsync } = useMutation('Create text', (data: ITextInput) =>
    TextService.create(data)
  );
  const [editor, setEditor] = useState();

  function clear(editor: any) {
    editor.update(() => {
      $getRoot().clear();
    });
  }

  const onSubmit: SubmitHandler<ITextInput> = async (data) => {
    data.text = telegramConverter(save(editor), null, 'html') as string;
    console.log(data);
    await mutateAsync(data);
    save(editor, true);
    clear(editor);
  };

  return { onSubmit, setEditor };
};
