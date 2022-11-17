import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { convertSelect } from '@/utils/convertSelect';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const VerticalField: FC<any> = ({
  control,
  name,
  className,
  isRequired = false
}) => {
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
        rules={
          isRequired
            ? {
                required: 'Выберите вертикаль'
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={selectTags || []}
            isMulti={false}
            placeholder="Выбрать вертикаль"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default VerticalField;
