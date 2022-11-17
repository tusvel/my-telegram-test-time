import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { LanguageType } from '@/shared/types/language/language.type';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const LangField: FC<any> = ({
  control,
  name,
  className,
  isRequired = false
}) => {
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={'ru'}
        rules={
          isRequired
            ? {
                required: 'Выберите язык'
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={
              ([
                { label: 'ru', value: 'ru' },
                { label: 'en', value: 'en' },
                { label: 'es', value: 'es' }
              ] as { label: LanguageType; value: LanguageType }[]) || []
            }
            isMulti={false}
            placeholder="Выбрать язык"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default LangField;
