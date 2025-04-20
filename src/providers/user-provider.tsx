'use client';

import { ChildrenProps } from '@/types';
import { AuthStatus } from '@/types/firebase';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import getValidExpiresIn from '@/firebase/get-valid-expires-in';

type UserContextType = {
  isUser: boolean | null;
  setIsUser: (_isUser: boolean) => void;
  checkAuthStatus: () => Promise<boolean | null>;
};

export const UserContext = createContext<UserContextType>({
  isUser: null,
  setIsUser: (_isUser: boolean) => {},
  checkAuthStatus: () => Promise.resolve(null),
});

const UserProvider = ({ children }: ChildrenProps): ReactNode => {
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuthStatus = async () => {
    const { isSessionActive }: AuthStatus = await fetch('/api/auth-status', {
      method: 'GET',
    }).then((res) => {
      return res.json();
    });
    if (isUser !== isSessionActive) setIsUser(isSessionActive);
    return isSessionActive;
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isUser) {
      checkAuthStatus();
      return;
    }
    const timeoutId = setTimeout(
      () =>
        checkAuthStatus().then((isSessionActive) => {
          if (!isSessionActive) router.replace(Routes.MAIN);
        }),
      getValidExpiresIn()
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isUser]);

  useEffect(() => {
    if (!isUser) return;

    checkAuthStatus();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ isUser, setIsUser, checkAuthStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
