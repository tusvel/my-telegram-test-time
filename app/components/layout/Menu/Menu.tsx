import Image from 'next/image';
import React, { FC } from 'react';

import AuthButton from '@/components/layout/Menu/AuthButton/AuthButton';
import MenuItem from '@/components/layout/Menu/MenuItem/MenuItem';
import { menuList } from '@/components/layout/Menu/menu.data';

import { useAuth } from '@/hooks/useAuth';

import logoPng from '@/assets/icons/logo.png';

const Menu: FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4 grow-0 min-h-screen fixed top-0 left-0 right-0 w-72">
      <div className="flex flex-shrink-0 items-center space-y-5 px-4">
        <Image src={logoPng} alt="telegram controller" className="h-8 w-auto" />
      </div>
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
          {menuList.map((item) => {
            if (user && item.role.includes(user?.role)) {
              return (
                <React.Fragment key={item.href}>
                  <MenuItem item={item} />
                </React.Fragment>
              );
            }
          })}
          <AuthButton user={user} />
        </nav>
      </div>
    </div>
  );
};

export default Menu;
