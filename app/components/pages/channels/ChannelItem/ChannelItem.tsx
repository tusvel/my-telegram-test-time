import Image from 'next/image';
import { FC } from 'react';

import { IChannel } from '@/shared/types/channel.interface';

const ChannelItem: FC<{ item: IChannel }> = ({ item }) => {
  return (
    <li className={'overflow-hidden rounded-md bg-white px-6 py-4 shadow w-96'}>
      <div>
        <div className="flex">
          <Image
            className="mr-3"
            src={item.profice_picture}
            alt={item.title}
            width={60}
            height={60}
          />
          <div className="flex flex-col justify-between">
            <div className="text-xl mt-[-6px]">{item.title}</div>
            <div>@{item.categories}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChannelItem;
