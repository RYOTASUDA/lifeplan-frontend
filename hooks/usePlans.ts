import useSWR from 'swr';
import { PlanResponse } from 'types/PlanResponse';
import { stringify } from 'querystring';
import { useEffect, useState } from 'react';

export type PlanGroup = {
  readonly era: number;
  readonly plans: PlanResponse[];
};

type Props = {
  readonly categoryId?: string;
};

type Return = {
  readonly allPlans: PlanGroup[];
  readonly setSearchParams: (params: Props) => void;
};

async function fetcher(url: string) {
  return fetch(url, { method: 'GET', credentials: 'include' }).then((res) => res.json());
}

export const usePlans = (): Return => {
  const [allPlans, setAllPlans] = useState<PlanGroup[]>([]);
  const [searchParams, setSearchParams] = useState<Props>({});

  useEffect(() => {
    console.log('searchParams', searchParams);
    const fetchPlans = async () => {
      const url = `${process.env.BACKEND_DOMAIN}/api/plans${
        searchParams && `?${stringify(searchParams)}`
      }`;
      const data = await fetcher(url);
      setAllPlans(data === undefined ? [] : data.allPlans);
    };

    fetchPlans();
  }, [searchParams]);

  return { allPlans, setSearchParams };
};
