import cn from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

import MenuItem from '@/components/layout/Menu/MenuItem/MenuItem';
import { menuList } from '@/components/layout/Menu/menu.data';

import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import styles from './Menu.module.scss';

const Menu: FC = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const onClickLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4 grow-0 min-h-screen fixed top-0 left-0 right-0 w-72">
      <div className="flex flex-shrink-0 items-center space-y-5 px-4">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
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
          {user ? (
            <button
              className={cn(
                'flex items-center px-3 py-4 text-sm font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                styles.login
              )}
              onClick={onClickLogout}
            >
              <div
                className="text-gray-400 group-hover:text-gray-500',
                'mr-3 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              >
                <MaterialIcon name="ArrowRightOnRectangleIcon" />
              </div>
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={cn(
                'group flex items-center px-3 py-4 text-sm font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                styles.login
              )}
            >
              <div
                className="text-gray-400 group-hover:text-gray-500',
                'mr-3 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              >
                <MaterialIcon name="ArrowRightOnRectangleIcon" />
              </div>
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Menu;
