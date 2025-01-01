import useSWR from 'swr';
import { Category } from 'types/Category';

type Props = {
  readonly categories: Array<Category>;
  readonly isLoading: boolean;
};

async function fetcher(url: string) {
  return fetch(url, { method: 'GET', credentials: 'include' }).then((res) => res.json());
}

export const useCategories = (): Props => {
  const { data, isLoading } = useSWR(`${process.env.BACKEND_DOMAIN}/api/categories`, fetcher);
  const categories = data === undefined ? [] : data.categories;

  return { categories, isLoading };
};
