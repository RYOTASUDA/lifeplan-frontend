import { mutate } from 'swr';

async function fetcher(url: string) {
  return fetch(url, { method: 'DELETE', credentials: 'include' }).then((res) => res.json());
}

export const useDeletePlan = () => {
  const deletePlan = async (id: number) => {
    await fetcher(`${process.env.BACKEND_DOMAIN}/api/plans/${id}`);
    mutate(`${process.env.BACKEND_DOMAIN}/api/plans`);
  };

  return { deletePlan };
};
