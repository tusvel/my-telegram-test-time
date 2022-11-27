import Users from '@/pages/users/Users';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const UsersPage: NextPageAuth = () => {
  return <Users />;
};

UsersPage.isOnlySuperAdmin = true;

export default UsersPage;
