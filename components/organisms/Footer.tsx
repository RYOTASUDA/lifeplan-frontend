import { Box, Button, Stack, Text } from '@yamada-ui/react';
import React, { ReactElement } from 'react';

export const Footer = (): ReactElement => (
  <Box as="footer" bg="gray.500" color="white" p={6} textAlign="center">
    <Text fontSize="sm">© 2024 LifePlanくん</Text>
    <Stack direction="row" justify="center" mt={4}>
      <Button color="white" variant="link">
        プライバシーポリシー
      </Button>
      <Button color="white" variant="link">
        利用規約
      </Button>
    </Stack>
  </Box>
);
