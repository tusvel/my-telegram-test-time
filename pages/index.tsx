import Home from '@/pages/home/Home';

import { NextPageAuth } from '@/shared/types/auth/auth.types';

const HomePage: NextPageAuth = () => {
  return <Home />;
};

HomePage.isOnlyAdmin = true;

export default HomePage;
