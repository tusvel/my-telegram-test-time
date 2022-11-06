import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useTypedSelector } from '@/hooks/useTypedSelector';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const ChannelField: FC<any> = ({ control, name }, ref) => {
  const { items: chanelItems, isLoading } = useTypedSelector(
    (state) => state.channel
  );

  const optionsItems = chanelItems?.map((item) => ({
    value: item.id,
    label: item.title
  }));

  return (
    <div>
      {' '}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={optionsItems || []}
            isLoading={isLoading}
            isMulti={false}
            placeholder="Выберите канал"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default ChannelField;
