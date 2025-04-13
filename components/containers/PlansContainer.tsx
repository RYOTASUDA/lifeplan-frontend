import { MonthPicker } from '@yamada-ui/calendar';
import {
  Box,
  Button,
  Card,
  Dialog,
  Divider,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
} from '@yamada-ui/react';
import React, { ReactElement, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RiEditBoxLine, RiDeleteBinLine } from 'react-icons/ri';
import { Footer } from 'components/organisms/Footer';
import { Header } from 'components/organisms/Header';
import { useCategories } from 'hooks/useCategories';
import { useCreatePlan } from 'hooks/usePlanCreate';
import { useDeletePlan } from 'hooks/usePlanDelete';
import { useUpdatePlan } from 'hooks/usePlanUpdate';
import { usePlans } from 'hooks/usePlans';
import { PlanRequest } from 'types/PlanRequest';
import { PlanResponse } from 'types/PlanResponse';

export const PlansContainer = (): ReactElement => {
  const { allPlans } = usePlans();
  const { categories } = useCategories();
  const { createPlan } = useCreatePlan();
  const { updatePlan } = useUpdatePlan();
  const { deletePlan } = useDeletePlan();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PlanRequest>({
    defaultValues: {
      title: '',
      deadline: new Date(),
      detail: '',
      periodType: 'life',
      categoryId: `${categories[0]?.id}`,
    },
  });

  const [modalMode, setModalMode] = useState<'create' | 'edit'>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<PlanResponse>(undefined);

  const openModal = (mode: 'create' | 'edit', plan: PlanResponse = undefined): void => {
    reset(
      mode === 'edit' && plan
        ? {
            id: plan.id,
            title: plan.title,
            deadline: new Date(plan.deadline),
            detail: plan.detail,
            periodType: plan.periodType,
            categoryId: `${plan.category.id}`,
          }
        : {
            title: '',
            deadline: new Date(),
            detail: '',
            periodType: 'life',
            categoryId: `${categories[0]?.id}`,
          }
    );
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = (): void => setIsModalOpen(false);

  const onSubmit: SubmitHandler<PlanRequest> = (data) => {
    if (modalMode === 'create') {
      createPlan(data);
    } else if (modalMode === 'edit') {
      updatePlan(data);
    }
    closeModal();
  };

  const openDeleteDialog = (plan: PlanResponse): void => {
    setPlanToDelete(plan);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = (): void => {
    setPlanToDelete(undefined);
    setIsDialogOpen(false);
  };

  const successDeletePlan = (plan: PlanResponse): void => {
    deletePlan(plan.id);
    closeDeleteDialog();
  };

  return (
    <>
      <Box>
        <Header />
        <Heading as="h1" padding="4">
          ライフプラン一覧
        </Heading>
        <Box padding="4">
          <Box marginBottom="4">
            <Button
              colorScheme="primary"
              onClick={(): void => openModal('create')}
              variant="outline"
            >
              追加
            </Button>
          </Box>

          <Flex direction="column" gap={4} mb={4}>
            {allPlans.map((planGroup) => (
              <Box key={planGroup.era} width={{ base: '100%', md: '360px' }}>
                <Flex align="center" my={2}>
                  <Text fontSize="xl" fontWeight="bold" mr="4">
                    {planGroup.era}年代
                  </Text>
                  <Divider flex="1" />
                </Flex>
                <Flex direction={{ base: 'row', lg: 'column' }} gap={4} wrap="wrap">
                  {planGroup.plans.map((plan) => (
                    <Card
                      key={plan.id}
                      bg="white"
                      border="2px solid"
                      borderColor={plan.category.color}
                      borderRadius="md"
                      mb={4}
                      p={4}
                      shadow="md"
                      width="100%"
                    >
                      <Flex align="center" justify="space-between">
                        <Flex gap={10}>
                          <Text as="b">{plan.deadline}</Text>
                          <Text as="b" fontSize="lg">
                            {plan.title}
                          </Text>
                          <Text>{plan.detail}</Text>
                        </Flex>
                        <Flex gap={10}>
                          <Flex gap={4}>
                            <IconButton
                              icon={<RiEditBoxLine />}
                              onClick={(): void => openModal('edit', plan)}
                              size={{ base: 'md', lg: 'xs' }}
                              variant="outline"
                            />
                            <IconButton
                              colorScheme="danger"
                              icon={<RiDeleteBinLine />}
                              onClick={(): void => openDeleteDialog(plan)}
                              size={{ base: 'md', lg: 'xs' }}
                              variant="outline"
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
        <Footer />
      </Box>

      {/* モーダル */}
      <Modal height="auto" isOpen={isModalOpen} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalHeader>ライフプラン編集</ModalHeader>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl
              errorMessage={errors.title ? errors.title.message : undefined}
              isInvalid={!!errors.title}
              isRequired
              label="タイトル"
              my={4}
            >
              <Input
                placeholder="タイトル"
                {...register('title', {
                  required: { value: true, message: 'タイトルは必須です。' },
                  maxLength: { value: 20, message: 'タイトルは20文字以内で入力してください。' },
                })}
              />
            </FormControl>

            <FormControl
              errorMessage={errors.deadline ? errors.deadline.message : undefined}
              isInvalid={!!errors.deadline}
              isRequired
              label="期限"
            >
              <Controller
                control={control}
                name="deadline"
                render={({ field }): ReactElement => (
                  <MonthPicker
                    defaultType="year"
                    monthFormat="M月"
                    placeholder="YYYY/MM"
                    {...field}
                    onChange={(date): void => {
                      field.onChange(date);
                      setIsMonthPickerOpen(false);
                    }}
                    onClick={(): void => setIsMonthPickerOpen(true)}
                    open={isMonthPickerOpen}
                  />
                )}
                rules={{ required: { value: true, message: '期限は必須です。' } }}
              />
            </FormControl>

            <FormControl
              errorMessage={errors.detail ? errors.detail.message : undefined}
              isInvalid={!!errors.detail}
              label="詳細"
              my={4}
            >
              <Textarea
                {...register('detail', {
                  maxLength: { value: 50, message: '詳細は50文字以内で入力してください。' },
                })}
              />
            </FormControl>

            <FormControl
              errorMessage={errors.categoryId ? errors.categoryId.message : undefined}
              isInvalid={!!errors.categoryId}
              isRequired
              label="カテゴリー"
              my={4}
            >
              <Controller
                control={control}
                name="categoryId"
                render={({ field }): ReactElement => (
                  <RadioGroup {...field}>
                    <Flex gap={2} wrap="wrap">
                      {categories.map((category) => (
                        <Radio key={category.id} color={category.color} value={`${category.id}`}>
                          {category.name}
                        </Radio>
                      ))}
                    </Flex>
                  </RadioGroup>
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button marginRight="4" onClick={closeModal} variant="outline">
              キャンセル
            </Button>
            <Button colorScheme="primary" type="submit" variant="outline">
              保存
            </Button>
          </ModalFooter>
        </VStack>
      </Modal>

      <Dialog
        cancel="キャンセル"
        isOpen={isDialogOpen}
        onCancel={closeDeleteDialog}
        onClose={closeDeleteDialog}
        onSuccess={(): void => successDeletePlan(planToDelete)}
        success={{
          variant: 'outline',
          colorScheme: 'red',
          children: '削除',
        }}
        withOverlay
      >
        <Text>ライフプラン「{planToDelete?.title}」を削除しますか？</Text>
      </Dialog>
    </>
  );
};
