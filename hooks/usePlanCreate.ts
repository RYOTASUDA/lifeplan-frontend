import { mutate } from 'swr';
import { PlanForm, PlanRequest } from 'types/PlanRequest';

async function fetcher(url: string, plan: PlanRequest) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  }).then((res) => res.json());
}

export const useCreatePlan = () => {
  const createPlan = async (plan: PlanForm) => {
    const planParams = { ...plan, categoryId: Number(plan.categoryId) };
    await fetcher(`${process.env.BACKEND_DOMAIN}/api/plans`, planParams);
    await mutate(`${process.env.BACKEND_DOMAIN}/api/plans`);
  };

  return { createPlan };
};
