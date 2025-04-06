import React from 'react';
import { vi } from 'vitest';

export const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return <a href={href}>{children}</a>;
};

export const useRouter = () => ({
  push: vi.fn(),
});
