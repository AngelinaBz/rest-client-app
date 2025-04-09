import { useState } from 'react';
import type { ObjectType } from '@/types';

export const useObjectList = (
  initialHeaders: ObjectType[] = [{ key: '', value: '' }]
) => {
  const [list, setList] = useState<ObjectType[]>(initialHeaders);

  const addItem = () => {
    setList((prev) => [...prev, { key: '', value: '' }]);
  };

  const updateItem = (index: number, key: string, value: string) => {
    setList((prev) =>
      prev.map((header, i) => (i === index ? { key, value } : header))
    );
  };

  const removeItem = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    list,
    addItem,
    updateItem,
    removeItem,
  };
};
