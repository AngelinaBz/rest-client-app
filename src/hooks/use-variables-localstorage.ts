import { useEffect, useReducer } from 'react';
import { VARIABLES_VALUE } from '@/utils/constants';
import { reducer } from './use-editor-items';

const useVariablesLocalStorage = () => {
  const [variables, setVariables] = useReducer(reducer, [], () => {
    try {
      const item = window.localStorage.getItem(VARIABLES_VALUE);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const keys = new Set();
    const filteredVariables = variables
      .map((item) => ({
        key: item.key.trim(),
        value: item.value.trim(),
      }))
      .filter((item) => {
        if (!item.key || !item.value || keys.has(item.key)) return false;
        keys.add(item.key);
        return true;
      });
    window.localStorage.setItem(
      VARIABLES_VALUE,
      JSON.stringify(filteredVariables)
    );
  }, [variables]);

  return [variables, setVariables] as const;
};

export default useVariablesLocalStorage;
