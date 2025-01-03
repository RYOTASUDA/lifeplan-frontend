import { mutate } from 'swr';
import { Category } from 'types/Category';

async function fetcher(url: string) {
  return fetch(url, { method: 'DELETE', credentials: 'include' }).then((res) => res.json());
}

export const useDeleteCategory = () => {
  const deleteCategory = async (category: Category) => {
    await fetcher(`${process.env.BACKEND_DOMAIN}/api/categories/${category.id}`);
    mutate(`${process.env.BACKEND_DOMAIN}/api/categories`);
  };

  return { deleteCategory };
};
