import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import RepostPost from '@/pages/history/RepostPost/RepostPost';

import Button from '@/components/ui/form-elements/Button';

import { IPost } from '@/shared/types/post.interface';

import styles from './PostItem.module.scss';

const PostItem: FC<{ item: IPost }> = ({ item }) => {
  return (
    <li
      className={'overflow-hidden rounded-md bg-white px-6 py-4 shadow w-1/2'}
    >
      <div className="flex flex-col">
        <div className="flex basis-20 flex-wrap">
          {item.media?.length > 0 &&
            item.media.map((media) => (
              <Image
                className="image-like-bg mr-5 mb-4"
                src={media}
                alt={media}
                width={100}
                height={100}
              />
            ))}
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: item.text }} />
        </div>
        {item.has_button && (
          <Button className={cn('mt-4 py-2 px-3')}>
            <a className={styles.button} href={item.button_url}>
              {item.text_button}
            </a>
          </Button>
        )}
      </div>
      <RepostPost />
    </li>
  );
};

export default PostItem;
