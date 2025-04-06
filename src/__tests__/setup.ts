import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

vi.mock(
  'next-intl',
  async () => await import('@/__tests__/__mocks__/next-intl')
);

vi.mock(
  '@/i18n/navigation',
  async () => await import('@/__tests__/__mocks__/navigation')
);
