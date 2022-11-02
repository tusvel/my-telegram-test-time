import React, { FC, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';

const QueryProvider: FC = () => {
  const { getAllChannels, getAllTexts, getAllMedia } = useActions();
  useEffect(() => {
    getAllChannels();
    getAllTexts();
    getAllMedia();
  }, []);
  return null;
};

export default QueryProvider;
