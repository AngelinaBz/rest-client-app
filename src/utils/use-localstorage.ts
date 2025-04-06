import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { REQUESTS_VALUE } from './constants';
import { RequestParams } from '@/types';

export const useLocalStorage = (): [
  RequestParams,
  Dispatch<SetStateAction<RequestParams>>,
] => {
  const [requests, setRequests] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(REQUESTS_VALUE);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(REQUESTS_VALUE, JSON.stringify(requests));
    } catch {}
  }, [requests]);

  return [requests, setRequests] as const;
};
