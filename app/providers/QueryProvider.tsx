import React, { FC, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';

const QueryProvider: FC = () => {
  const { getAllChannels } = useActions();
  useEffect(() => {
    getAllChannels();
  }, []);
  return null;
};

export default QueryProvider;
