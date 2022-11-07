import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { convertSelect } from '@/utils/convertSelect';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const TagField: FC<any> = ({ control, name, className, required = true }) => {
  const { items: tagItems } = useTypedSelector((state) => state.tag);
  const selectTags = convertSelect(tagItems, 'value', 'value');

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        rules={
          required
            ? {
                required: 'Пожалуйста укажите теги'
              }
            : undefined
        }
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={selectTags || []}
            isMulti={true}
            placeholder="Выберите теги"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default TagField;
