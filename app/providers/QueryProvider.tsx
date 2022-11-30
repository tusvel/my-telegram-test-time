import React, { FC, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

const QueryProvider: FC = () => {
  const { user } = useAuth();
  const {
    getAllChannels,
    getAllTexts,
    getAllMedia,
    getAllTags,
    getAllPosts,
    getAllClients
  } = useActions();
  useEffect(() => {
    getAllChannels();
    getAllTexts();
    getAllMedia();
    getAllTags();
    getAllPosts();
    getAllClients();
  }, [user]);
  return null;
};

export { QueryProvider };
