import type { AppProps } from 'next/app';

import { TypeComponentAuthFields } from '@/shared/types/auth/auth.types';

import '@/assets/styles/globals.scss';

import MainProvider from '../app/providers/MainProvider';

type appType = AppProps & TypeComponentAuthFields;

export default function App({ Component, pageProps }: appType) {
  return (
    <MainProvider Component={Component}>
      <Component {...pageProps} />
    </MainProvider>
  );
}
