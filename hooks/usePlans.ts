import useSWR from 'swr';
import { PlanResponse } from 'types/PlanResponse';
import { stringify } from 'querystring';
import { useEffect, useState } from 'react';

export type PlanGroup = {
  readonly era: number;
  readonly plans: PlanResponse[];
};

type Props = {
  readonly categoryId?: number;
};

type Return = {
  readonly allPlans: PlanGroup[];
};

async function fetcher(url: string) {
  return fetch(url, { method: 'GET', credentials: 'include' }).then((res) => res.json());
}

export const usePlans = (searchParams: Props): Return => {
  const [allPlans, setAllPlans] = useState<PlanGroup[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const url = `${process.env.BACKEND_DOMAIN}/api/plans${
        searchParams && `?${stringify(searchParams)}`
      }`;
      const data = await fetcher(url);
      setAllPlans(data === undefined ? [] : data.allPlans);
    };

    fetchPlans();
  }, [searchParams]);

  return { allPlans };
};
