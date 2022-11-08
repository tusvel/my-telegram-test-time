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
    [
      {
        title: 'Не привязан к каналу',
        id: 'null',
        profice_picture:
          'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      },
      ...(chanelItems || [])
    ],
    'title',
    'id',
    'profice_picture'
  );
  const formatOptionChannel = ({ label, image }: any) => (
    <div className="flex items-center">
      <Image
        className="mr-2 overflow-hidden"
        src={image}
        alt={label}
        width={35}
        height={35}
      />
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
            classNamePrefix="custom-select"
          />
        )}
      />
    </div>
  );
};

export default ChannelField;
