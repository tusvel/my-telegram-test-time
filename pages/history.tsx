import History from '@/pages/history/History';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const HistoryPage: NextPageAuth = () => {
  return <History />;
};

HistoryPage.isOnlyAdmin = true;

export default HistoryPage;
