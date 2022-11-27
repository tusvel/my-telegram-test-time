import Tags from '@/components/pages/tags/tags';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const TagsPage: NextPageAuth = () => {
  return <Tags />;
};

TagsPage.isOnlyUser = true;

export default TagsPage;
