import { FC } from 'react';

import { IPost } from '@/shared/types/post.interface';

const PostItem: FC<{ item: IPost }> = ({ item }) => {
  return (
    <li className={'overflow-hidden rounded-md bg-white px-6 py-4 shadow w-96'}>
      <div>
        <div>{item.text}</div>
      </div>
    </li>
  );
};

export default PostItem;
