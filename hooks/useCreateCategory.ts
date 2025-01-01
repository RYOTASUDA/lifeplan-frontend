import useSWR from 'swr';
import { Category } from 'types/Category';

async function fetcher(url: string, category: Category) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(category),
  }).then((res) => res.json());
}

export const useCreateCategory = () => {
  const createCategory = async (category: Category) => {
    return fetcher(`${process.env.BACKEND_DOMAIN}/api/categories`, category);
  };

  return { createCategory };
};
