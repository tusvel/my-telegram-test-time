import dynamic from 'next/dynamic';
import { FC, PropsWithChildren } from 'react';

const Menu = dynamic(() => import('@/components/layout/Menu/Menu'), {
  ssr: false
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Menu />
      <div className="pt-5 pl-72 ml-5 p-5 w-full">{children}</div>
    </div>
  );
};

export default Layout;
