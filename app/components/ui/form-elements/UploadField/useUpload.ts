import { ChangeEvent, useCallback, useMemo } from 'react';

type TypeUpload = (onChange: (...event: any[]) => void) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const useUpload: TypeUpload = (onChange) => {
  const uploadFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    onChange(formData);
  }, []);

  return useMemo(() => ({ uploadFile }), [uploadFile]);
};
