'use client';

import { createContext, ReactNode, useState } from 'react';

export const UserContext = createContext({
  isUser: false,
  setIsUser: (_isUser: boolean) => {},
});

type UserProviderProps = { children: ReactNode };

const UserProvider = ({ children }: UserProviderProps): ReactNode => {
  const [isUser, setIsUser] = useState(false);

  return (
    <UserContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
