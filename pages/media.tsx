import Media from '@/pages/media/Media';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const MediaPage: NextPageAuth = () => {
  return <Media />;
};

MediaPage.isOnlyUser = true;

export default MediaPage;
