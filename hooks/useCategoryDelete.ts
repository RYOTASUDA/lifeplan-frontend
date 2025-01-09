import { mutate } from 'swr';

async function fetcher(url: string) {
  return fetch(url, { method: 'DELETE', credentials: 'include' }).then((res) => res.json());
}

export const useDeleteCategory = () => {
  const deleteCategory = async (id: number) => {
    await fetcher(`${process.env.BACKEND_DOMAIN}/api/categories/${id}`);
    mutate(`${process.env.BACKEND_DOMAIN}/api/categories`);
  };

  return { deleteCategory };
};
