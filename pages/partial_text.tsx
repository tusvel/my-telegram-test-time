import PartialText from '@/pages/PartialText/PartialText';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const PartialTextPage: NextPageAuth = () => {
  return <PartialText />;
};

PartialTextPage.isOnlyUser = true;

export default PartialTextPage;
