import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
  ssr: false
});

const AuthProvider: FC<PropsWithChildren & TypeComponentAuthFields> = ({
  children,
  Component: { isOnlyUser, isOnlySuperAdmin, isOnlyAdmin }
}) => {
  const { user } = useAuth();
  const { logout, checkAuth } = useActions();
  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) checkAuth();
  }, []);
  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken && user) logout();
  }, [pathname]);

  return !isOnlySuperAdmin && !isOnlyAdmin && !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlySuperAdmin, isOnlyAdmin, isOnlyUser }}>
      {children}
    </DynamicCheckRole>
  );
};
