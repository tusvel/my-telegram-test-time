import Image from 'next/image';
import { FC } from 'react';

import repostImage from '@/assets/icons/repost.svg';

const RepostPost: FC = () => {
  return (
    <div>
      <Image src={repostImage} alt="Repost" />
    </div>
  );
};

export default RepostPost;
