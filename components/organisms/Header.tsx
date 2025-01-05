import { Box, Button, Heading, Stack } from '@yamada-ui/react';
import React, { ReactElement } from 'react';
import { GoogleLoginButton } from 'components/atoms/GoogleLoginButton';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useGoogleLogout } from 'hooks/useGoogleLogout';

export const Header = (): ReactElement => {
  const { currentUser } = useCurrentUser();
  const isSignedIn = currentUser !== undefined;
  const { googleLogout } = useGoogleLogout();

  const handleGoogleLogout = (): void => {
    window.location.href = '/';
    googleLogout();
  };

  return (
    <Box as="header" bg="gray.500" color="white" p={4}>
      <Stack align="center" direction="row" justify="space-between">
        <Heading size="lg">LifePlan 管理くん</Heading>
        <Stack direction="row">
          {isSignedIn ? (
            <>
              <Button as="a" color="white" href="/" variant="ghost">
                ホーム
              </Button>
              <Button as="a" color="white" href="/plans" variant="ghost">
                ライフプラン
              </Button>
              <Button as="a" color="white" href="/categories" variant="ghost">
                カテゴリー設定
              </Button>
              <Button colorScheme="teal" onClick={handleGoogleLogout}>
                ログアウト
              </Button>
            </>
          ) : (
            <GoogleLoginButton mt={0} size={undefined} text="Googleログイン" />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
