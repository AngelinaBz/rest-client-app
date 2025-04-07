import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HISTORY_VALUE } from '@/utils/constants';
import { RequestParams } from '@/types';

export const useHistoryLocalstorage = (): [
  RequestParams[],
  Dispatch<SetStateAction<RequestParams[]>>,
] => {
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return null;

    try {
      const item = window.localStorage.getItem(HISTORY_VALUE);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(HISTORY_VALUE, JSON.stringify(history));
  }, [history]);

  return [history, setHistory] as const;
};
