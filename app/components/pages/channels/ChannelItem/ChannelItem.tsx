import { FC } from 'react';

import { IChannel } from '@/shared/types/channel.interface';

import styles from './ChannelItem.module.scss';

const ChannelItem: FC<{ item: IChannel }> = ({ item }) => {
  return (
    <div className={styles.item}>
      <div>
        <div>{item.title}</div>
      </div>
    </div>
  );
};

export default ChannelItem;
