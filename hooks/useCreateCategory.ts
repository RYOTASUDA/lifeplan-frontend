import { mutate } from 'swr';
import { Category } from 'types/Category';

async function fetcher(url: string, category: Category) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  }).then((res) => res.json());
}

export const useCreateCategory = () => {
  const createCategory = async (category: Category) => {
    await fetcher(`${process.env.BACKEND_DOMAIN}/api/categories`, category);
    mutate(`${process.env.BACKEND_DOMAIN}/api/categories`);
  };

  return { createCategory };
};
