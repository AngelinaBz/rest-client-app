'use client';

import { ChildrenProps } from '@/types';
import { AuthStatus } from '@/types/firebase';
import { createContext, ReactNode, useEffect, useState } from 'react';

type UserContextType = {
  isUser: boolean | null;
  setIsUser: (_isUser: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  isUser: null,
  setIsUser: (_isUser: boolean) => {},
});

const UserProvider = ({ children }: ChildrenProps): ReactNode => {
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { isSessionActive }: AuthStatus = await fetch('/api/auth-status', {
        method: 'GET',
      }).then((res) => {
        return res.json();
      });
      setIsUser(isSessionActive);
    };

    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
