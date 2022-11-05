import { ChangeEvent, useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { FileService } from '@/services/file.service';

type TypeUpload = (onChange: (...event: any[]) => void) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const useUpload: TypeUpload = (onChange) => {
  const { mutateAsync } = useMutation(
    'upload file',
    (data: FormData) => FileService.upload(data, 'file'),
    {
      onSuccess: ({ data }) => {
        onChange(data[0].url);
      }
    }
  );

  const uploadFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    /*    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }*/

    const formData = new FormData();
    formData.append('files', files[0]);

    await mutateAsync(formData);

    onChange(formData);
  }, []);

  return useMemo(() => ({ uploadFile }), [uploadFile]);
};
