import React, { FC } from 'react';

import MenuItem from '@/components/layout/Menu/MenuItem/MenuItem';
import { firstMenu } from '@/components/layout/Menu/menu.data';

const Menu: FC = () => {
  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4 grow-0 basis-72 min-h-screen">
      <div className="flex flex-shrink-0 items-center space-y-5 px-4">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <div className="mt-5 flex flex-grow flex-col">
        <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
          {firstMenu.map((item) => (
            <React.Fragment key={item.href}>
              <MenuItem item={item} />
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
