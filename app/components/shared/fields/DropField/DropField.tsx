import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Dropzone } from '@/ui/form-elements/Dropzone';

const DropField: FC<any> = ({
  control,
  name,
  className,
  multiple = true,
  title = 'Выберите файлы',
  myFiles,
  setMyFiles
}) => {
  return (
    <div className={className}>
      {title}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Dropzone
            myFiles={myFiles}
            setMyFiles={setMyFiles}
            multiple={multiple}
            showPreview
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default DropField;
