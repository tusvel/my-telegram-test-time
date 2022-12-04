import cn from 'classnames';
import { FC } from 'react';

import MediaItem from '@/pages/media/MediaItem/MediaItem';

import styles from '@/ui/List/ListItem/ListItem.module.scss';
import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { useTypedSelector } from '@/hooks/useTypedSelector';

const MediaContent: FC<{ edit: Function; remove: Function }> = ({
  edit,
  remove
}) => {
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
          gamblingItems.map((item) => (
            <div key={item.id} className={cn('relative', styles.item)}>
              <MediaItem item={item} />
              <div
                className={cn(
                  'absolute top-0 right-0 flex items-center',
                  styles.editItems
                )}
              >
                <div
                  onClick={() => edit(item)}
                  className="cursor-pointer w-6 h-6"
                >
                  <MaterialIcon name="PencilSquareIcon" />
                </div>
                <div
                  onClick={() => remove(item)}
                  className="cursor-pointer w-6 h-6"
                >
                  <MaterialIcon name="TrashIcon" />
                </div>
              </div>
            </div>
          ))}
      </ul>
      <ul role="list" className="space-y-3 mt-5 mr-10">
        <span className="mb-5">Casino</span>
        {casinoItems &&
          casinoItems.length > 0 &&
          casinoItems.map((item) => (
            <div key={item.id} className={cn('relative', styles.item)}>
              <MediaItem item={item} />
              <div
                className={cn(
                  'absolute top-0 right-0 flex items-center',
                  styles.editItems
                )}
              >
                <div
                  onClick={() => edit(item)}
                  className="cursor-pointer w-6 h-6"
                >
                  <MaterialIcon name="PencilSquareIcon" />
                </div>
                <div
                  onClick={() => remove(item)}
                  className="cursor-pointer w-6 h-6"
                >
                  <MaterialIcon name="TrashIcon" />
                </div>
              </div>
            </div>
          ))}
      </ul>
      <ul role="list" className="space-y-3 mt-5">
        <span className="mb-5">Crypto</span>
        {cryptoItems &&
          cryptoItems.length > 0 &&
          cryptoItems.map((item) => (
            <div key={item.id} className={cn('relative', styles.item)}>
              <MediaItem item={item} />
              <div
                className={cn(
                  'absolute top-0 right-0 flex items-center',
                  styles.editItems
                )}
              >
                <div
                  onClick={() => edit(item)}
                  className="cursor-pointer w-6 h-6"
                >
                  <MaterialIcon name="PencilSquareIcon" />
                </div>
                <div
                  onClick={() => remove(item)}
                  className="cursor-pointer w-6 h-6"
                >
                  <MaterialIcon name="TrashIcon" />
                </div>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default MediaContent;
