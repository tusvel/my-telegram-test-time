import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { TextService } from '@/services/text.service';

import { telegramConverter } from '@/utils/telegram-converter';

export const useEditTextItem: any = (save: any) => {
  const [editor, setEditor] = useState();
  const { mutateAsync } = useMutation('Edit text item', (data: ITextInput) =>
    TextService.editItem(data)
  );

  const onEditSubmit: SubmitHandler<any> = async (data) => {
    data.text = telegramConverter(save(editor), null, 'html') as string;
    console.log(data);
    await mutateAsync(data);
  };

  return { onEditSubmit, setEditor };
};
