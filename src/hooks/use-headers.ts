import { useReducer } from 'react';
import type { HeaderType } from '@/types';

export type HeadersAction =
  | { type: 'add' }
  | { type: 'update'; payload: { index: number; key: string; value: string } }
  | { type: 'remove'; payload: { index: number } };

const reducer = (state: HeaderType[], action: HeadersAction) => {
  switch (action.type) {
    case 'add':
      return [...state, { key: '', value: '' }];
    case 'update':
      const { key, value, index } = action.payload;
      return state.map((header, i) => (i === index ? { key, value } : header));
    case 'remove':
      return state.filter((_, i) => i !== action.payload.index);
    default:
      return state;
  }
};

const initialState: HeaderType[] = [{ key: '', value: '' }];

const useHeaders = () => useReducer(reducer, initialState);

export default useHeaders;
