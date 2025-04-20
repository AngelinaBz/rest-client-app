import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SubmitButton } from '@/components/submit-button';
import { describe, expect, it, vi } from 'vitest';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      send: 'Send',
    };
    return messages[key] ?? key;
  },
}));

describe('SubmitButton', () => {
  it('renders button with translated text and handles click', () => {
    const handleClick = vi.fn();
    render(<SubmitButton onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Send' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
