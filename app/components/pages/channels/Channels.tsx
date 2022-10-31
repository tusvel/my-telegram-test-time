import { FC } from 'react';

import ChannelItem from '@/pages/channels/ChannelItem/ChannelItem';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

const Channels: FC = () => {
  const { isLoading, items } = useTypedSelector((state) => state.channel);

  return (
    <Meta title="Create post" description="Create post in telegram">
      <div>
        {items?.length &&
          items.map((item) => <ChannelItem key={item.id} item={item} />)}
      </div>
    </Meta>
  );
};

export default Channels;
