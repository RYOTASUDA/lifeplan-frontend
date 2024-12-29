import axios from 'axios';

type Props = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

type ResponseProps<T> = {
  data: T;
  headers: unknown;
};

export const ApiClient = async <T>({ url, method }: Props): Promise<T> => {
  try {
    const instanceOptions = { withCredentials: true };
    const axiosInstance = axios.create(instanceOptions);
    let res!: ResponseProps<T>;
    if (method === 'GET') {
      res = await axiosInstance.get(url);
    } else if (method === 'POST') {
      res = await axiosInstance.post(url);
    } else if (method === 'PUT') {
      res = await axiosInstance.put(url);
    } else if (method === 'DELETE') {
      res = await axiosInstance.delete(url);
    }
    return res.data;
  } catch {
    console.log('fail');
  }
};
