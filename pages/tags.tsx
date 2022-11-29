import Tags from '@/pages/tags/Tags';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const TagsPage: NextPageAuth = () => {
  return <Tags />;
};

TagsPage.isOnlyUser = true;

export default TagsPage;
