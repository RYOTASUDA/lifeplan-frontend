import { mutate } from 'swr';
import { Category } from 'types/Category';

async function fetcher(url: string, category: Category) {
  return fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  }).then((res) => res.json());
}

export const useUpdateCategory = () => {
  const updateCategory = async (category: Category) => {
    await fetcher(`${process.env.BACKEND_DOMAIN}/api/categories/${category.id}`, category);
    mutate(`${process.env.BACKEND_DOMAIN}/api/categories`);
  };

  return { updateCategory };
};
