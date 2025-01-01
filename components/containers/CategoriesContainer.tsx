import {
  Box,
  Text,
  Card,
  Button,
  SimpleGrid,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
} from '@yamada-ui/react';
import React, { ReactElement, useState } from 'react';
import { Footer } from 'components/organisms/Footer';
import { Header } from 'components/organisms/Header';
import { useCategories } from 'hooks/useCategories';
import { useCreateCategory } from 'hooks/useCreateCategory';
import { Category } from 'types/Category';

export const CategoriesContainer = (): ReactElement => {
  const { categories } = useCategories();
  const { createCategory } = useCreateCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = (mode: 'create' | 'edit', category: Category = undefined): void => {
    setModalMode(mode);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedCategory(undefined);
  };

  const handleSubmit = (mode: 'create' | 'edit', category: Category) => (): void => {
    if (mode === 'create') {
      createCategory(category);
    } else if (mode === 'edit') {
      // updateCategory(category);
    }
    closeModal();
  };

  return (
    <>
      <Box>
        <Header />
        <Heading as="h1" padding="4">
          カテゴリー設定
        </Heading>
        <Box padding="4">
          <Box marginBottom="4" textAlign="right">
            <Button colorScheme="primary" onClick={(): void => openModal('create')}>
              作成
            </Button>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }}>
            {categories.map((category) => (
              <Card
                key={category.id}
                bg="white"
                border="2px solid"
                borderColor={category.color}
                borderRadius="md"
                mb={4}
                p={4}
                shadow="md"
                width="100%"
              >
                <Flex align="center" justify="space-between">
                  <Text as="b" fontSize="lg">
                    {category.name}
                  </Text>
                  <Flex gap="2">
                    <Button colorScheme="primary" onClick={(): void => openModal('edit', category)}>
                      編集
                    </Button>
                    <Button colorScheme="danger">削除</Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
        <Footer />
      </Box>

      <Modal height={400} isOpen={isModalOpen} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalHeader>
          {modalMode === 'create' ? '新しいカテゴリーを作成' : 'カテゴリーを編集'}
        </ModalHeader>
        <ModalBody />
        <ModalFooter>
          <Button marginRight="4" onClick={closeModal} variant="outline">
            キャンセル
          </Button>
          <Button colorScheme="primary" onClick={handleSubmit(modalMode, selectedCategory)}>
            {modalMode === 'create' ? '作成' : '保存'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
