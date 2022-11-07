import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { convertSelect } from '@/utils/convertSelect';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const MediaField: FC<any> = ({ control, name, className }) => {
  const { items: mediaItems } = useTypedSelector((state) => state.media);

  const mediaItemsSelect = convertSelect(mediaItems, 'url', 'url', 'url');

  const formatOptionLabel = ({ image, label }: any) => (
    <div className="flex image-select__image-option">
      <img src={image} alt="golden gate bridge" className="w-20 h-20" />
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
            options={mediaItemsSelect || []}
            isMulti={true}
            placeholder="Выбрать медиа"
            error={error}
            formatOptionLabel={formatOptionLabel}
            classNamePrefix="media-select"
          />
        )}
      />
    </div>
  );
};

export default MediaField;
