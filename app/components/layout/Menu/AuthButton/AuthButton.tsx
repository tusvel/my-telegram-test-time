import cn from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

import MaterialIcon from '@/ui/MaterialIcon/MaterialIcon';

import { useActions } from '@/hooks/useActions';

import { IUserResponse } from '@/shared/types/user/user-response.interface';

const AuthButton: FC<{ user: IUserResponse | null }> = ({ user }) => {
  const { logout } = useActions();
  const onClickLogout = () => {
    logout();
  };

  return (
    <>
      {user ? (
        <a
          className={cn(
            'group flex items-center px-3 py-2 text-sm font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          )}
          style={{ marginTop: 15 }}
          onClick={onClickLogout}
        >
          <div
            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          >
            <MaterialIcon name="ArrowRightOnRectangleIcon" />
          </div>
          Logout
        </a>
      ) : (
        <Link
          href="/login"
          className={cn(
            'group flex items-center px-3 py-2 text-sm font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          )}
          style={{ marginTop: 15 }}
        >
          <div
            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          >
            <MaterialIcon name="ArrowRightOnRectangleIcon" />
          </div>
          Login
        </Link>
      )}
    </>
  );
};

export default AuthButton;
