import { createContext } from 'react';
import { CurrentUser } from 'types/CurrentUser';

export const UserDefaultValue = {
  name: undefined,
  email: undefined,
};

export const UserContext = createContext<CurrentUser>(UserDefaultValue);
