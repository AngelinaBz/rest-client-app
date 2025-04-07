import React from 'react';
import { vi } from 'vitest';

export const Link = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export const useRouter = () => ({
  push: vi.fn(),
});
