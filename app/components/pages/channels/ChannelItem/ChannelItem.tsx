import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import styles from '@/ui/List/ListItem/ListItem.module.scss';
import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { IChannelResponse } from '@/shared/types/channel/channel-response.interface';

import { getPictureApi } from '@/config/api.config';

const ChannelItem: FC<{
  item: IChannelResponse;
  remove: Function;
  edit: Function;
}> = ({ item, remove, edit }) => {
  return (
    <li
      className={cn(
        'relative overflow-hidden rounded-md bg-white p-4 shadow w-96',
        styles.item
      )}
    >
      <div>
        <div className="flex">
          <Image
            src={getPictureApi(item.profile_picture)}
            alt={item.title}
            height={60}
            width={60}
            className="mr-3 h-[60px] w-[60px] image-like-bg"
          />
          <div className="flex flex-col justify-between">
            <div className="text-xl mt-[-6px]">{item.title}</div>
            <div>@{item.vertical}</div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'absolute top-0 right-0 flex items-center',
          styles.editItems
        )}
      >
        <div onClick={() => edit(item)} className="cursor-pointer w-6 h-6">
          <MaterialIcon name="PencilSquareIcon" />
        </div>
        <div onClick={() => remove(item)} className="cursor-pointer w-6 h-6">
          <MaterialIcon name="TrashIcon" />
        </div>
      </div>
    </li>
  );
};

export default ChannelItem;
