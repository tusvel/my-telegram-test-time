import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import Layout from '@/components/layout/Layout';

import { TypeComponentAuthFields } from '@/shared/types/auth/auth.types';

import { store } from '@/store/store';

import AuthProvider from './AuthProvider/AuthProvider';
import { QueryProvider } from './QueryProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const MainProvider: FC<PropsWithChildren & TypeComponentAuthFields> = ({
  Component,
  children
}) => {
  return (
    <Provider store={store}>
      <QueryProvider />
      <QueryClientProvider client={queryClient}>
        <AuthProvider Component={Component}>
          <Layout>{children}</Layout>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default MainProvider;
