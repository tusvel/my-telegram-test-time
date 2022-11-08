import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { convertSelect } from '@/utils/convertSelect';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const CategoryField: FC<any> = ({ control, name, className }) => {
  const selectTags = convertSelect(
    [
      { label: 'gambling', value: 'gambling' },
      { label: 'casino', value: 'casino' },
      { label: 'crypto', value: 'crypto' }
    ],
    'label',
    'value'
  );
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        rules={{
          required: 'Выберите категорию'
        }}
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={selectTags || []}
            isMulti={false}
            placeholder="Выбрать категорию"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default CategoryField;
