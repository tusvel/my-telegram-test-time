import { FC } from 'react';

import CreateMedia from '@/pages/media/CreateMedia';
import MediaContent from '@/pages/media/MediaContent';

import Meta from '@/utils/meta/Meta';
import EditMedia from "@/pages/media/EditMedia";

const Media: FC = () => {
  return (
    <Meta title="Media" description="Media in telegram">
      <CreateMedia />
      <MediaContent />
      <EditMedia/>
    </Meta>
  );
};

export default Media;
