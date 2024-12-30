import useSWR from 'swr';
import { CurrentUser } from 'types/CurrentUser';

type Props = {
  currentUser: CurrentUser | undefined;
};

async function fetcher(url: string) {
  return fetch(url, { method: 'GET', credentials: 'include' }).then((res) => res.json());
}

export const useCurrentUser = (): Props => {
  const { data } = useSWR(`${process.env.BACKEND_DOMAIN}/api/users`, fetcher);
  const currentUser = data?.user ? data.user : undefined;

  return { currentUser };
};
