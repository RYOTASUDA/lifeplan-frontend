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
  VStack,
  FormControl,
  Input,
  RadioGroup,
  Radio,
  Dialog,
} from '@yamada-ui/react';
import React, { ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Footer } from 'components/organisms/Footer';
import { Header } from 'components/organisms/Header';
import { useCategories } from 'hooks/useCategories';
import { useDeleteCategory } from 'hooks/useCategoriesDelete';
import { useCreateCategory } from 'hooks/useCreateCategory';
import { useUpdateCategory } from 'hooks/useUpdateCategory';
import { Category } from 'types/Category';

export const CategoriesContainer = (): ReactElement => {
  const { categories } = useCategories();
  const { createCategory } = useCreateCategory();
  const { updateCategory } = useUpdateCategory();
  const { deleteCategory } = useDeleteCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>(undefined);
  const [categoryName, setCategoryName] = useState<string>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category>(undefined);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Category>({
    defaultValues: {
      name: '',
      color: '#2e2e2e',
    },
  });

  const openModal = (mode: 'create' | 'edit', category: Category = undefined): void => {
    if (mode === 'edit' && category) {
      reset({
        id: category.id,
        name: category.name,
        color: category.color,
      });
      setCategoryName(category.name);
    } else {
      reset({
        name: '',
        color: '#2e2e2e',
      });
    }
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setModalMode(undefined);
    setCategoryName(undefined);
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<Category> = (data) => {
    if (modalMode === 'create') {
      createCategory(data);
    } else if (modalMode === 'edit') {
      updateCategory(data);
    }
    closeModal();
  };

  const openDialog = (category: Category): void => {
    setCategoryToDelete(category);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = (): void => {
    setCategoryToDelete(undefined);
    setIsDialogOpen(false);
  };

  const successDeleteCategory = (category: Category): void => {
    deleteCategory(category);
    setIsDialogOpen(false);
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
              <>
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
                      <Button
                        colorScheme="primary"
                        onClick={(): void => openModal('edit', category)}
                      >
                        編集
                      </Button>
                      <Button colorScheme="danger" onClick={(): void => openDialog(category)}>
                        削除
                      </Button>
                    </Flex>
                  </Flex>
                </Card>
              </>
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
        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl
              errorMessage={errors.name ? errors.name.message : undefined}
              isInvalid={!!errors.name}
              label="カテゴリー名"
              my={4}
            >
              <Input
                placeholder="健康"
                {...register('name', {
                  required: { value: true, message: 'カテゴリー名は必須です。' },
                  validate: (value) => {
                    if (modalMode === 'edit' && value === categoryName) {
                      return true;
                    }
                    return (
                      !categories.some((category) => category.name === value) ||
                      '既に使用されています。'
                    );
                  },
                })}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.color} label="テーマ">
              <Controller
                control={control}
                defaultValue="#2e2e2e"
                name="color"
                // eslint-disable-next-line  @typescript-eslint/prefer-readonly-parameter-types
                render={({ field }): ReactElement => (
                  <RadioGroup {...field}>
                    <Flex gap={2} wrap="wrap">
                      {[
                        '#2e2e2e',
                        '#868e96',
                        '#fa5252',
                        '#e64980',
                        '#be4bdb',
                        '#7950f2',
                        '#4c6ef5',
                        '#228be6',
                        '#15aabf',
                        '#12b886',
                        '#40c057',
                        '#82c91e',
                        '#fab005',
                        '#fd7e14',
                      ].map((color) => (
                        <Radio
                          key={color}
                          _before={{
                            content: '""',
                            display: 'block',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            bg: color,
                            border: '2px solid',
                            borderColor: 'gray.300',
                          }}
                          _checked={{
                            borderColor: 'blue.500',
                          }}
                          size="lg"
                          value={color}
                        />
                      ))}
                    </Flex>
                  </RadioGroup>
                )}
                rules={{ required: '色を選択してください。' }}
              />
              {errors.color && <Text color="red.500">{errors.color.message}</Text>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button marginRight="4" onClick={closeModal} variant="outline">
              キャンセル
            </Button>
            <Button colorScheme="primary" type="submit">
              {modalMode === 'create' ? '作成' : '保存'}
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>

      <Dialog
        cancel="キャンセル"
        isOpen={isDialogOpen}
        onCancel={closeDeleteDialog}
        onClose={closeDeleteDialog}
        onSuccess={(): void => successDeleteCategory(categoryToDelete)}
        success={{
          variant: 'outline',
          colorScheme: 'red',
          children: '削除',
        }}
        withOverlay
      >
        <Text>カテゴリー「{categoryToDelete?.name}」を削除しますか？</Text>
      </Dialog>
    </>
  );
};
