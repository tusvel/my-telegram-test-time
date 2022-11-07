import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { convertSelect } from '@/utils/convertSelect';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const ChannelField: FC<any> = ({ control, name, className }) => {
  const { items: chanelItems, isLoading } = useTypedSelector(
    (state) => state.channel
  );
  const optionsItems = convertSelect(
    chanelItems,
    'title',
    'id',
    'profice_picture'
  );
  const formatOptionChannel = ({ value, label, image }: any) => (
    <div className="flex items-center">
      <Image className="mr-2" src={image} alt={label} width={35} height={35} />
      {label}
    </div>
  );

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        rules={{
          required: 'Пожалуйста укажите канал'
        }}
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={optionsItems || []}
            isLoading={isLoading}
            isMulti={false}
            formatOptionLabel={formatOptionChannel}
            placeholder="Выберите канал"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default ChannelField;
