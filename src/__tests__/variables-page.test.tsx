import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import messages from '@/../messages/en.json';
import VariablesPage from '@/app/[locale]/variables/page';

const variablesMessages = messages.Variables;

vi.mock('use-intl', () => ({
  useTranslations: () => (key: keyof typeof variablesMessages) =>
    variablesMessages[key],
}));

vi.mock('@/components/page-wrapper', () => ({
  PageWrapper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('next/dynamic', async () => {
  return {
    default: () => () => <div>Variables Editor</div>,
  };
});

describe('Variables Page', () => {
  it('renders Variables Page correctly', () => {
    render(<VariablesPage />);

    const title = screen.getByText(variablesMessages.title);
    expect(title).toBeInstanceOf(HTMLHeadingElement);

    const editor = screen.getByText('Variables Editor');
    expect(editor).toBeInTheDocument();
  });
});
