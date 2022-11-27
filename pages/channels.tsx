import Channels from '@/pages/channels/Channels';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const ChannelsPage: NextPageAuth = () => {
  return <Channels />;
};

ChannelsPage.isOnlyAdmin = true;

export default ChannelsPage;
