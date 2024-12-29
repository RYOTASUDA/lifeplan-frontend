import { ApiClient } from './ApiClient';

export const GoogleLoginApi = async (): Promise<void> => {
  await ApiClient({
    url: `${process.env.BKK_DOMAIN}/auth/google_oauth2`,
    method: 'GET',
  });
};
