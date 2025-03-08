import { Box, Button, Heading, Text, Stack, Card, Icon } from '@yamada-ui/react';
import React, { ReactElement, useContext } from 'react';
import { FaRegListAlt, FaMoneyBillAlt, FaCalendarCheck } from 'react-icons/fa';
import { GoogleLoginButton } from 'components/atoms/GoogleLoginButton';
import { Footer } from 'components/organisms/Footer';
import { Header } from 'components/organisms/Header';
import { UserContext } from 'lib/contexts/UserContext';

export const HomeContainer = (): ReactElement => {
  const currentUser = useContext(UserContext);

  return (
    <Box>
      <Header />
      {/* ヒーローセクション */}
      <Box bg="gray.100" px={4} py={16} textAlign="center">
        <Heading size="xl">あなたの人生の計画を今すぐ始めよう</Heading>
        <Text color="gray.600" fontSize="lg" mt={4}>
          ライフプラン、バケットリスト、ファイナンシャルプランを一元管理
        </Text>
        {!currentUser && <GoogleLoginButton mt={6} size="lg" text="無料で始める" />}
      </Box>
      {/* 機能紹介セクション */}
      <Box bg="white" px={4} py={20}>
        <Stack
          align="center"
          direction={{ base: 'row', lg: 'column' }}
          flexWrap="wrap"
          justify="center"
        >
          {/* ライフプラン管理機能 */}
          <Card p={6} shadow="xl" textAlign="center" w="300px" width={{ lg: 'full' }}>
            <Icon as={FaCalendarCheck} color="teal.500" h={12} w={12} />
            <Heading mt={4} size="md">
              ライフプラン管理
            </Heading>
            <Text color="gray.500" mt={2}>
              人生の各ステージに合わせて目標を設定し、進捗を管理できます。
            </Text>
            {currentUser ? (
              <Button as="a" colorScheme="teal" href="plans" mt={4} variant="outline">
                プランを作成
              </Button>
            ) : (
              <GoogleLoginButton mt={0} size={undefined} text="Googleログインして始める" />
            )}
          </Card>
          {/* バケットリスト */}
          <Card p={6} shadow="xl" textAlign="center" w="300px" width={{ lg: 'full' }}>
            <Icon as={FaRegListAlt} color="teal.500" h={12} w={12} />
            <Heading mt={4} size="md">
              バケットリスト
            </Heading>
            <Text color="gray.500" mt={2}>
              達成したい目標や夢をリスト化し、実現に向けて進めます。
            </Text>
            <Button colorScheme="teal" mt={4} variant="outline">
              準備中
            </Button>
          </Card>
          {/* ファイナンシャルプラン */}
          <Card p={6} shadow="xl" textAlign="center" w="300px" width={{ lg: 'full' }}>
            <Icon as={FaMoneyBillAlt} color="teal.500" h={12} w={12} />
            <Heading mt={4} size="md">
              ファイナンシャルプラン
            </Heading>
            <Text color="gray.500" mt={2}>
              収支管理や将来の貯蓄計画をしっかり立てましょう。
            </Text>
            <Button colorScheme="teal" mt={4} variant="outline">
              準備中
            </Button>
          </Card>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};
