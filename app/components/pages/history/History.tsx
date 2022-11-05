import { FC } from 'react';

import PostItem from '@/pages/history/PostItem';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import Meta from '@/utils/meta/Meta';

const History: FC = () => {
  const { items } = useTypedSelector((state) => state.post);

  return (
    <Meta title="History posts" description="History posts in telegram">
      <ul role="list" className="space-y-3">
        {items?.length &&
          items.map((item) => <PostItem key={item.id} item={item} />)}
      </ul>
    </Meta>
  );
};

export default History;
