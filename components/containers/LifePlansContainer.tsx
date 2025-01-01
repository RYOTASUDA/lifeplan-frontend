import { Box } from '@yamada-ui/react';
import React, { ReactElement } from 'react';
import { Footer } from 'components/organisms/Footer';
import { Header } from 'components/organisms/Header';

export const LifePlansContainer = (): ReactElement => (
  <Box>
    <Header />
    <Box py={100} />
    <Footer />
  </Box>
);
