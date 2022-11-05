import React, { FC, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';

const QueryProvider: FC = () => {
  const { getAllChannels, getAllTexts, getAllMedia, getAllTags, getAllPosts } =
    useActions();
  useEffect(() => {
    getAllChannels();
    getAllTexts();
    getAllMedia();
    getAllTags();
    getAllPosts();
  }, []);
  return null;
};

export default QueryProvider;
