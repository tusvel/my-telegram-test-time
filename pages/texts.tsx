import Texts from '@/pages/texts/Texts';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const TextsPage: NextPageAuth = () => {
  return <Texts />;
};

TextsPage.isOnlyUser = true;

export default TextsPage;
