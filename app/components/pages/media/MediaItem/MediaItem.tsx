import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { IMediaResponse } from '@/shared/types/media/media-response.interface';

import { getPictureApi } from '@/config/api.config';

const MediaItem: FC<{ item: IMediaResponse }> = ({ item }) => {
  return (
    <div>
      <li
        className={cn(
          'overflow-hidden relative rounded-md bg-white shadow w-72'
        )}
      >
        <Image
          src={getPictureApi(item.url)}
          alt={item.url}
          className="w-[150px] h-[150px] image-like-bg"
          width={150}
          height={150}
        />
        <div
          className={cn(
            'absolute bottom-0 right-1 text-slate-500 text-base w-32 flex flex-wrap'
          )}
        >
          {item.tags?.map((item) => (
            <span
              key={item.id}
              className={cn({
                ['text-violet-800']: item.is_special
              })}
            >
              #{item.value}
            </span>
          ))}
        </div>
      </li>
    </div>
  );
};

export default MediaItem;
