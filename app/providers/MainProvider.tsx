import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import Layout from '@/components/layout/Layout';

import { TypeComponentAuthFields } from '@/shared/types/auth/auth.types';

import { store } from '@/store/store';

import QueryProvider from './QueryProvider';

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
        <Layout>{children}</Layout>
      </QueryClientProvider>
    </Provider>
  );
};

export default MainProvider;
