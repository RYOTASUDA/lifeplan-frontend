import useSWR from 'swr';
import { PlanResponse } from 'types/PlanResponse';

export type PlanGroup = {
  readonly era: number;
  readonly plans: PlanResponse[];
};

type Props = {
  readonly allPlans: PlanGroup[];
};

async function fetcher(url: string) {
  return fetch(url, { method: 'GET', credentials: 'include' }).then((res) => res.json());
}

export const usePlans = (): Props => {
  const { data } = useSWR(`${process.env.BACKEND_DOMAIN}/api/plans`, fetcher);
  const allPlans = data === undefined ? [] : data.allPlans;

  return { allPlans };
};
