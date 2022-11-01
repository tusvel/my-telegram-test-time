import { FC } from 'react';

import { IChannel } from '@/shared/types/channel.interface';

const ChannelItem: FC<{ item: IChannel }> = ({ item }) => {
  return (
    <li className={'overflow-hidden rounded-md bg-white px-6 py-4 shadow w-96'}>
      <div>
        <div>{item.title}</div>
      </div>
    </li>
  );
};

export default ChannelItem;
