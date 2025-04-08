import { useState } from 'react';
import type { HeaderType } from '@/types';

export const useHeaders = (
  initialHeaders: HeaderType[] = [{ key: '', value: '' }]
) => {
  const [headers, setHeaders] = useState<HeaderType[]>(initialHeaders);

  const addHeader = () => {
    setHeaders((prev) => [...prev, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    setHeaders((prev) =>
      prev.map((header, i) => (i === index ? { key, value } : header))
    );
  };

  const removeHeader = (index: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    headers,
    addHeader,
    updateHeader,
    removeHeader,
  };
};
