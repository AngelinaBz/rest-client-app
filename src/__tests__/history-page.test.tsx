import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messages from '@/../messages/en.json';
import HistoryPage from '@/app/[locale]/history/page';
import { ChildrenProps } from '@/types';

const historyMessages = messages.History;
const historyComponentText = 'History Component';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: keyof typeof historyMessages) =>
    historyMessages[key],
}));

vi.mock('@/components/page-wrapper', () => ({
  PageWrapper: ({ children }: ChildrenProps) => <div>{children}</div>,
}));

vi.mock('next/dynamic', async () => {
  return {
    default: () => () => <div>{historyComponentText}</div>,
  };
});

describe('History Page', () => {
  it('renders History Page correctly', () => {
    render(<HistoryPage />);

    const title = screen.getByText(historyMessages.title);
    expect(title).toBeInstanceOf(HTMLHeadingElement);

    const editor = screen.getByText(historyComponentText);
    expect(editor).toBeInTheDocument();
  });
});
