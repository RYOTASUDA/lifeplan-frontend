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
      <Box bg="gray.100" py={16} textAlign="center">
        <Heading size="xl">あなたの人生の計画を今すぐ始めよう</Heading>
        <Text color="gray.600" fontSize="lg" mt={4}>
          ライフプラン、バケットリスト、ファイナンシャルプランを一元管理
        </Text>
        {!currentUser && <GoogleLoginButton mt={6} size="lg" text="無料で始める" />}
      </Box>
      {/* 機能紹介セクション */}
      <Box bg="white" py={20}>
        <Stack direction="row" justify="center">
          {/* ライフプラン管理機能 */}
          <Card maxW="300px" p={6} shadow="xl" textAlign="center">
            <Icon as={FaCalendarCheck} color="teal.500" h={12} w={12} />
            <Heading mt={4} size="md">
              ライフプラン管理
            </Heading>
            <Text color="gray.500" mt={2}>
              人生の各ステージに合わせて目標を設定し、進捗を管理できます。例えば、キャリアの目標や旅行の計画などを、シンプルに追跡できます。
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
          <Card maxW="300px" p={6} shadow="xl" textAlign="center">
            <Icon as={FaRegListAlt} color="teal.500" h={12} w={12} />
            <Heading mt={4} size="md">
              バケットリスト
            </Heading>
            <Text color="gray.500" mt={2}>
              達成したい目標や夢をリスト化し、実現に向けて進めます。旅行、スキルの習得、挑戦したい活動をリストアップして、進捗をチェックできます。
            </Text>
            <Button colorScheme="teal" mt={4} variant="outline">
              準備中
            </Button>
          </Card>
          {/* ファイナンシャルプラン表 */}
          <Card maxW="300px" p={6} shadow="xl" textAlign="center">
            <Icon as={FaMoneyBillAlt} color="teal.500" h={12} w={12} />
            <Heading mt={4} size="md">
              ファイナンシャルプラン
            </Heading>
            <Text color="gray.500" mt={2}>
              収支管理や将来の貯蓄計画をしっかり立てましょう。貯金目標やローンの返済計画も一元管理できます。
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
