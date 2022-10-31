import { FC } from 'react';

import CreatePost from '@/pages/home/CreatePost/CreatePost';

import Meta from '@/utils/meta/Meta';

const Home: FC = () => {
  return (
    <Meta title="Create post" description="Create post in telegram">
      <div>
        <CreatePost />
      </div>
    </Meta>
  );
};

export default Home;
