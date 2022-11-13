import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { TextService } from '@/services/text.service';

export const useEditText: any = (clearTextItems: any) => {
  const { items } = useTypedSelector((state) => state.textEdit);
  const { mutateAsync } = useMutation('Create text', (data: ITextInput) =>
    TextService.edit(data)
  );

  const onEditSubmit: SubmitHandler<any> = async (data) => {
    data.texts = items;
    console.log(data);
    await mutateAsync(data);
    clearTextItems();
  };

  return { onEditSubmit };
};
