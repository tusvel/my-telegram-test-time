import { FC } from 'react';

import CreateMedia from '@/pages/media/CreateMedia';
import MediaContent from '@/pages/media/MediaContent';

import Meta from '@/utils/meta/Meta';

const Media: FC = () => {
  return (
    <Meta title="Media" description="Media in telegram">
      <CreateMedia />
      <MediaContent />
    </Meta>
  );
};

export default Media;
