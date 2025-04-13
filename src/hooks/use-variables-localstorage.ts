import { useEffect, useReducer, useState } from 'react';
import { VARIABLES_VALUE } from '@/utils/constants';
import { reducer } from './use-editor-items';

const useVariablesLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

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
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const nonEmptyVariables = variables
        .map((item) => ({
          key: item.key.trim(),
          value: item.value.trim(),
        }))
        .filter((item) => item.key && item.value);
      window.localStorage.setItem(
        VARIABLES_VALUE,
        JSON.stringify(nonEmptyVariables)
      );
    }
  }, [variables, isClient]);

  return isClient
    ? ([variables, setVariables] as const)
    : ([null, null] as const);
};

export default useVariablesLocalStorage;
