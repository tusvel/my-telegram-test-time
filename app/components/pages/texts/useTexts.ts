import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ITextInput } from '@/pages/texts/ITextInput';

import { TextService } from '@/services/text.service';

export const useCreateText = () => {
  const { mutateAsync } = useMutation('Create text', (data: ITextInput) =>
    TextService.create(data)
  );

  const onSubmit: SubmitHandler<ITextInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit };
};
