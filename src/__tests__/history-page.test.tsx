import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import messages from '@/../messages/en.json';
import HistoryPage from '@/app/[locale]/history/page';

const historyMessages = messages.History;

vi.mock('use-intl', () => ({
  useTranslations: () => (key: keyof typeof historyMessages) =>
    historyMessages[key],
}));

vi.mock('@/components/page-wrapper', () => ({
  PageWrapper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('next/dynamic', async () => {
  return {
    default: () => () => <div>History Component</div>,
  };
});

describe('History Page', () => {
  it('renders Variables Page correctly', () => {
    render(<HistoryPage />);

    const title = screen.getByText(historyMessages.title);
    expect(title).toBeInstanceOf(HTMLHeadingElement);

    const editor = screen.getByText('History Component');
    expect(editor).toBeInTheDocument();
  });
});
