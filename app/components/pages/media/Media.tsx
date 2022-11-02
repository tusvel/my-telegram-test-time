import { FC } from 'react';

import MediaItem from '@/pages/media/MediaItem/MediaItem';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

const Media: FC = () => {
  const { items } = useTypedSelector((state) => state.media);
  return (
    <Meta title="Media" description="Media in telegram">
      <div>
        <ul role="list" className="space-y-3">
          {items &&
            items.length > 0 &&
            items.map((item) => <MediaItem key={item.id} item={item} />)}
        </ul>
      </div>
    </Meta>
  );
};

export default Media;
