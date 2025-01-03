import useSWR from 'swr';
import { CurrentUser } from 'types/CurrentUser';

type Props = {
  currentUser: CurrentUser | undefined;
};

async function fetcher(url: string) {
  const res = await fetch(url, { method: 'GET', credentials: 'include' });

  if (res.status === 401 && window.location.pathname !== '/') {
    return (window.location.href = '/');
  }
  return res.json();
}

export const useCurrentUser = (): Props => {
  const { data } = useSWR(`${process.env.BACKEND_DOMAIN}/api/users`, fetcher);

  return { currentUser: data?.user };
};
