import { UIProvider } from '@yamada-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <UIProvider>
      <Head>
        <title>Lifeplan</title>
      </Head>
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </UIProvider>
  </>
);

export default MyApp;
