import cn from 'classnames';
import { FC } from 'react';

import { IUploadField } from '@/ui/form-elements/UploadField/upload-field.interface';
import { useUpload } from '@/ui/form-elements/UploadField/useUpload';

import styles from '../form.module.scss';

const UploadField: FC<IUploadField> = ({
  error,
  style,
  placeholder,
  onChange,
  value,
  folder
}) => {
  const { uploadFile } = useUpload(onChange);
  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadFlex}>
        <label>
          <span>{placeholder}</span>
          <input multiple type="file" onChange={uploadFile} />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>
      </div>
    </div>
  );
};

export default UploadField;
