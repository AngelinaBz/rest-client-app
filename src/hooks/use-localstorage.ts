import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { REQUESTS_VALUE } from '@/utils/constants';
import { RequestParams } from '@/types';

export const useLocalStorage = (): [
  RequestParams,
  Dispatch<SetStateAction<RequestParams>>,
] => {
  const [requests, setRequests] = useState(() => {
    if (typeof window === 'undefined') return [];

    try {
      const item = window.localStorage.getItem(REQUESTS_VALUE);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(REQUESTS_VALUE, JSON.stringify(requests));
  }, [requests]);

  return [requests, setRequests] as const;
};
