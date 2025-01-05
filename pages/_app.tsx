import { UIProvider } from '@yamada-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { UserContext, UserDefaultValue } from 'lib/contexts/UserContext';

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState(UserDefaultValue);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <>
      <UIProvider>
        <UserContext.Provider value={user}>
          <Head>
            <title>LifePlan 管理くん</title>
          </Head>
          <Component {...pageProps} />
        </UserContext.Provider>
      </UIProvider>
    </>
  );
};

export default MyApp;
