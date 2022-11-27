import { FC, useState } from 'react';

import PostItem from '@/pages/history/PostItem';

import { useSearch } from '@/hooks/filter/useSearch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IPostResponse } from '@/shared/types/post/post-response.interface';

import Meta from '@/utils/meta/Meta';

const History: FC = () => {
  const { items } = useTypedSelector((state) => state.post);

  //filter
  const [value, setValue] = useState('');
  const textsItem = useSearch(items, value);

  return (
    <Meta title="History posts" description="History posts in telegram">
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Поиск текста"
          className="mb-5"
          style={{
            display: 'block',
            width: '300px',
            borderRadius: '15px',
            height: '50px'
          }}
        />
      </div>
      <ul role="list" className="space-y-3">
        {textsItem?.length > 0 &&
          textsItem.map((item: IPostResponse) => (
            <PostItem key={item.id} item={item} />
          ))}
      </ul>
    </Meta>
  );
};

export default History;
