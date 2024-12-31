import { mutate } from 'swr';

type ResponseProps = {
  googleLogout: () => void;
};

async function fetcher(url: string) {
  return fetch(url, { method: 'DELETE', credentials: 'include' }).then((res) => res.json());
}

export const useGoogleLogout = (): ResponseProps => {
  const googleLogout = () => {
    fetcher(`${process.env.BACKEND_DOMAIN}/api/logout`);
    mutate(`${process.env.BACKEND_DOMAIN}/api/users`, null, false);
  };

  return { googleLogout };
};
