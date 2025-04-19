import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import messages from '@/../messages/en.json';
import VariablesPage from '@/app/[locale]/variables/page';
import { ChildrenProps } from '@/types';

const variablesMessages = messages.Variables;
const VariablesEditorText = 'Variables Editor';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: keyof typeof variablesMessages) =>
    variablesMessages[key],
}));

vi.mock('@/components/page-wrapper', () => ({
  PageWrapper: ({ children }: ChildrenProps) => <div>{children}</div>,
}));

vi.mock('next/dynamic', async () => {
  return {
    default: () => () => <div>{VariablesEditorText}</div>,
  };
});

describe('Variables Page', () => {
  it('renders Variables Page correctly', () => {
    render(<VariablesPage />);

    const title = screen.getByText(variablesMessages.title);
    expect(title).toBeInstanceOf(HTMLHeadingElement);

    const editor = screen.getByText(VariablesEditorText);
    expect(editor).toBeInTheDocument();
  });
});
