import cn from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { convertSelect } from '@/utils/convertSelect';

import { getPictureApi } from '@/config/api.config';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const ChannelField: FC<any> = ({
  control,
  name,
  className,
  isMulti = false,
  isRequired = false
}) => {
  const { items: chanelItems, isLoading } = useTypedSelector(
    (state) => state.channel
  );
  const optionsItems = convertSelect(
    [...(chanelItems || [])],
    'title',
    'id',
    'profile_picture'
  );
  const formatOptionChannel = ({ label, image }: any) => (
    <div className="flex items-center">
      <Image
        className="mr-2 overflow-hidden object-cover"
        src={getPictureApi(image)}
        alt={label}
        width={35}
        height={35}
      />
      {label}
    </div>
  );

  return (
    <div className={cn(className, 'my-3')}>
      <Controller
        control={control}
        name={name}
        rules={
          isRequired
            ? {
                required: 'Пожалуйста укажите канал'
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={optionsItems || []}
            isLoading={isLoading}
            isMulti={isMulti}
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
