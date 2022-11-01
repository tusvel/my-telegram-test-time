import { FC } from 'react';

import ChannelItem from '@/pages/channels/ChannelItem/ChannelItem';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

const Channels: FC = () => {
  const { isLoading, items } = useTypedSelector((state) => state.channel);

  return (
    <Meta title="Channels" description="Channels in telegram">
      <ul role="list" className="space-y-3">
        {items?.length &&
          items.map((item) => <ChannelItem key={item.id} item={item} />)}
      </ul>
    </Meta>
  );
};

export default Channels;
