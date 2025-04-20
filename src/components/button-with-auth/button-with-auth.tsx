import useAuth from '@/hooks/use-auth';
import React, { JSX } from 'react';

const ButtonWithAuth = ({ children }: { children: JSX.Element }) => {
  const { isUser, setIsUser, checkAuthStatus } = useAuth();

  const onClick = async () => {
    const isSessionActive = await checkAuthStatus();

    if (isUser === isSessionActive) return;

    setIsUser(Boolean(isSessionActive));
  };

  return <>{React.cloneElement(children, { onClick })}</>;
};

export default ButtonWithAuth;
