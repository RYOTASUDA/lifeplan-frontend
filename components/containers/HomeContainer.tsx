import { Box, Button, Heading, Text, Progress, Stack, Card, Icon } from '@yamada-ui/react';
import React, { ReactElement } from 'react';
import { FaRegListAlt, FaMoneyBillAlt, FaCalendarCheck } from 'react-icons/fa';

export const HomeContainer = (): ReactElement => (
  <Box>
    {/* ヘッダー */}
    <Box as="header" bg="gray.500" color="white" p={4}>
      <Stack align="center" direction="row" justify="space-between">
        <Heading size="lg">Life Planくん</Heading>
        <Stack direction="row" spacing={4}>
          <Button color="white" variant="ghost">
            ホーム
          </Button>
          <Button color="white" variant="ghost">
            プランニング
          </Button>
          <Button color="white" variant="ghost">
            サポート
          </Button>
          <Button colorScheme="teal">ログイン</Button>
        </Stack>
      </Stack>
    </Box>

    {/* ヒーローセクション */}
    <Box bg="gray.100" py={16} textAlign="center">
      <Heading size="xl">あなたの人生の計画を今すぐ始めよう</Heading>
      <Text color="gray.600" fontSize="lg" mt={4}>
        ライフプラン、バケットリスト、ファイナンシャルプランを一元管理
      </Text>
      <Button colorScheme="teal" mt={6} size="lg">
        無料で始める
      </Button>
    </Box>

    {/* 機能紹介セクション */}
    <Box bg="white" py={20}>
      <Stack direction="row" justify="center" spacing={12}>
        {/* ライフプラン管理機能 */}
        <Card maxW="300px" p={6} shadow="xl" textAlign="center">
          <Icon as={FaCalendarCheck} color="teal.500" h={12} w={12} />
          <Heading mt={4} size="md">
            ライフプラン管理
          </Heading>
          <Text color="gray.500" mt={2}>
            人生の各ステージに合わせて目標を設定し、進捗を管理できます。例えば、キャリアの目標や旅行の計画などを、シンプルに追跡できます。
          </Text>
          <Button colorScheme="teal" mt={4} variant="outline">
            プランを作成
          </Button>
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
            新しい目標を追加
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
            プランを作成
          </Button>
        </Card>
      </Stack>
    </Box>

    {/* 進捗セクション */}
    <Box bg="gray.50" py={16} textAlign="center">
      <Heading size="lg">進捗状況</Heading>
      <Text color="gray.600" mt={4}>
        目標達成度を一目で確認しましょう。
      </Text>
      <Stack direction="row" justify="center" mt={8} spacing={8}>
        {/* 進捗バー */}
        <Box width="300px">
          <Text color="gray.500">ライフプラン進捗</Text>
          <Progress colorScheme="teal" size="sm" value={75} />
        </Box>
        <Box width="300px">
          <Text color="gray.500">バケットリスト進捗</Text>
          <Progress colorScheme="teal" size="sm" value={30} />
        </Box>
        <Box width="300px">
          <Text color="gray.500">ファイナンシャルプラン進捗</Text>
          <Progress colorScheme="teal" size="sm" value={50} />
        </Box>
      </Stack>
    </Box>

    {/* フッター */}
    <Box as="footer" bg="gray.500" color="white" p={6} textAlign="center">
      <Text fontSize="sm">© 2024 LifePlanくん</Text>
      <Stack direction="row" justify="center" mt={4} spacing={4}>
        <Button color="white" variant="link">
          プライバシーポリシー
        </Button>
        <Button color="white" variant="link">
          利用規約
        </Button>
      </Stack>
    </Box>
  </Box>
);
