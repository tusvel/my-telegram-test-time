import cn from 'classnames';
import { FC } from 'react';

import { IMediaResponse } from '@/shared/types/media/media-response.interface';

const MediaItem: FC<{ item: IMediaResponse }> = ({ item }) => {
  return (
    <div>
      <li
        className={cn(
          'overflow-hidden rounded-md bg-white px-6 py-4 shadow w-1/2'
        )}
      >
        {item.url}
      </li>
    </div>
  );
};

export default MediaItem;
