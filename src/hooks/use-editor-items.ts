import { useReducer } from 'react';
import type { EditorItem } from '@/types';

export type EditorItemAction =
  | { type: 'add' }
  | { type: 'update'; payload: { index: number; key: string; value: string } }
  | { type: 'remove'; payload: { index: number } }
  | { type: 'addAll'; payload: EditorItem[] };

export const reducer = (state: EditorItem[], action: EditorItemAction) => {
  switch (action.type) {
    case 'add':
      return [...state, { key: '', value: '' }];
    case 'update':
      const { key, value, index } = action.payload;
      return state.map((header, i) => (i === index ? { key, value } : header));
    case 'remove':
      return state.filter((_, i) => i !== action.payload.index);
    case 'addAll':
      return action.payload;
    default:
      return state;
  }
};

const initialState: EditorItem[] = [{ key: '', value: '' }];

const useEditorItems = () => useReducer(reducer, initialState);

export default useEditorItems;
