import { FC, PropsWithChildren } from 'react';

import Menu from '@/components/layout/Menu/Menu';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Menu />
      <div className="pt-5 pl-72 ml-5 p-5 w-full">{children}</div>
    </div>
  );
};

export default Layout;
