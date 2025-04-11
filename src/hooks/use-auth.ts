import { UserContext } from '@/providers/user-provider';
import { useContext } from 'react';

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
