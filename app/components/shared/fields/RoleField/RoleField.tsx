import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const RoleField: FC<any> = ({
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
                required: 'Выберите роль'
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={
              ([
                { label: 'user', value: 'user' },
                { label: 'admin', value: 'admin' },
                { label: 'superadmin', value: 'superadmin' }
              ] as {
                label: 'user' | 'admin' | 'superadmin';
                value: 'user' | 'admin' | 'superadmin';
              }[]) || []
            }
            isMulti={false}
            placeholder="Выбрать роль"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default RoleField;
