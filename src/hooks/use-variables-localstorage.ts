import { useEffect, useReducer, useState } from 'react';
import { VARIABLES_VALUE } from '@/utils/constants';
import { reducer } from './use-editor-items';

const useVariablesLocalStorage = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const [variables, setVariables] = useReducer(reducer, [], () => {
    if (typeof window === 'undefined') return [];

    try {
      const item = window.localStorage.getItem(VARIABLES_VALUE);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      window.localStorage.setItem(VARIABLES_VALUE, JSON.stringify(variables));
    }
  }, [variables, hasMounted]);

  return hasMounted
    ? ([variables, setVariables] as const)
    : ([null, null] as const);
};

export default useVariablesLocalStorage;
