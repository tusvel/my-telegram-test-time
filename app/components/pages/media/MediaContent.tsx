import { FC } from 'react';

import MediaItem from '@/pages/media/MediaItem/MediaItem';

import { useTypedSelector } from '@/hooks/useTypedSelector';

const MediaContent: FC = () => {
  const { items } = useTypedSelector((state) => state.media);

  const gamblingItems =
    items?.filter((item) => item.vertical === 'gambling') || [];
  const casinoItems = items?.filter((item) => item.vertical === 'casino') || [];
  const cryptoItems = items?.filter((item) => item.vertical === 'crypto') || [];

  return (
    <div className="flex">
      <ul role="list" className="space-y-3 mt-5 mr-10">
        <span className="mb-5">Gambling</span>
        {gamblingItems &&
          gamblingItems.length > 0 &&
          gamblingItems.map((item) => <MediaItem key={item.id} item={item} />)}
      </ul>
      <ul role="list" className="space-y-3 mt-5 mr-10">
        <span className="mb-5">Casino</span>
        {casinoItems &&
          casinoItems.length > 0 &&
          casinoItems.map((item) => <MediaItem key={item.id} item={item} />)}
      </ul>
      <ul role="list" className="space-y-3 mt-5">
        <span className="mb-5">Crypto</span>
        {cryptoItems &&
          cryptoItems.length > 0 &&
          cryptoItems.map((item) => <MediaItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
};

export default MediaContent;
