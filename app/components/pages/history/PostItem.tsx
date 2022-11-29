import cn from 'classnames';
import { FC } from 'react';

import RepostPost from '@/pages/history/RepostPost/RepostPost';

import Button from '@/components/ui/form-elements/Button';

import { IPostResponse } from '@/shared/types/post/post-response.interface';

import styles from './PostItem.module.scss';

const PostItem: FC<{ item: IPostResponse }> = ({ item }) => {
  return (
    <li
      className={cn(
        'rounded-md bg-white px-6 py-4 shadow w-1/2 relative',
        styles.item
      )}
    >
      <div className="flex flex-col">
        <div className="flex basis-20 flex-wrap">
          {/*          {item.media?.length > 0 &&
            item.media.map((media, index) => (
              <Image
                key={index}
                className="image-like-bg mr-5 mb-4"
                src={media}
                alt={media}
                width={100}
                height={100}
              />
            ))}*/}
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
      <RepostPost item={item} />
    </li>
  );
};

export default PostItem;
