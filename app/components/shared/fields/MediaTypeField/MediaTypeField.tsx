import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { MediaType } from '@/shared/types/media/media.type';

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const MediaTypeField: FC<any> = ({
  control,
  name,
  className,
  isRequired = false,
  defaultValue
}) => {
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || ''}
        rules={
          isRequired
            ? {
                required: 'Выберите тип медиа'
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <DynamicSelect
            field={field}
            options={
              ([
                { label: 'video', value: 'video' },
                { label: 'video_note', value: 'video_note' },
                { label: 'voice', value: 'voice' },
                { label: 'photo', value: 'photo' }
              ] as { label: MediaType; value: MediaType }[]) || []
            }
            isMulti={false}
            placeholder="Тип медиа"
            error={error}
          />
        )}
      />
    </div>
  );
};

export default MediaTypeField;
