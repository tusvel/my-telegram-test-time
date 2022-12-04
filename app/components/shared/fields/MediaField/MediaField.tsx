import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { convertSelect } from '@/utils/convertSelect';
import {getPictureApi} from "@/config/api.config";
import Image from "next/image";

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
  ssr: false
});
const MediaField: FC<any> = ({ control, name, className }) => {
  const { items: mediaItems } = useTypedSelector((state) => state.media);

  const mediaItemsSelect = convertSelect(mediaItems, 'url', 'id', 'url');

  const formatOptionLabel = ({ image, label }: any) => (
    <div className="flex image-select__image-option">
      <div className="w-[150px] h-[150px] relative">
        <Image src={getPictureApi(image)} alt="golden gate bridge" fill={true} className="image-like-bg"/>
      </div>
    </div>
  );

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
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
