import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Dropzone } from '@/ui/form-elements/Dropzone';

const DropField: FC<any> = ({ control, name, className }) => {
  return (
    <div className={className}>
      Выберите файлы
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Dropzone multiple showPreview onChange={onChange} />
        )}
      />
    </div>
  );
};

export default DropField;
