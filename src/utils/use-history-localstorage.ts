import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HISTORY_VALUE } from './constants';
import { RequestParams } from '@/types';

export const useHistoryLocalstorage = (): [
  RequestParams[],
  Dispatch<SetStateAction<RequestParams[]>>,
] => {
  const [history, setHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(HISTORY_VALUE);
        return item ? JSON.parse(item) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_VALUE, JSON.stringify(history));
    } catch {}
  }, [history]);

  return [history, setHistory] as const;
};
