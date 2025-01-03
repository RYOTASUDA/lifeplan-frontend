import { Box, Text } from '@yamada-ui/react';
import React, { ReactElement } from 'react';

export const Footer = (): ReactElement => (
  <Box as="footer" bg="gray.500" color="white" p={6} textAlign="center">
    <Text fontSize="sm">© 2025 LifePlan管理くん</Text>
  </Box>
);
