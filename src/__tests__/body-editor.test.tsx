import { render, screen, fireEvent } from '@testing-library/react';
import BodyEditor from '@/components/body-editor';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';

vi.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string) => void;
  }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange?.(e.target.value)
      }
      placeholder="Enter text here"
    />
  ),
}));

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      requestBody: 'Request Body',
      plainText: 'Plain Text',
    };
    return messages[key] ?? key;
  },
}));

describe('BodyEditor', () => {
  it('renders with initial JSON type and body', () => {
    render(<BodyEditor body='{"test":1}' setBody={() => {}} />);
    expect(screen.getByText('Request Body')).toBeInTheDocument();
    expect(screen.getByTestId('monaco-editor')).toHaveValue('{"test":1}');
  });

  it('renders with empty body', () => {
    render(<BodyEditor body="" setBody={() => {}} />);
    expect(screen.getByTestId('monaco-editor')).toHaveValue('');
  });

  it('calls setBody when textarea changes', () => {
    const mockSetBody = vi.fn();

    render(<BodyEditor body="original" setBody={mockSetBody} />);

    const textarea = screen.getByTestId('monaco-editor');
    fireEvent.change(textarea, { target: { value: 'updated' } });
    expect(mockSetBody).toHaveBeenCalledWith('updated');
  });

  it('renders with Plain Text label', () => {
    vi.mock('react', async () => {
      const actual = await vi.importActual('react');
      return {
        ...actual,
        useState: () => ['TEXT', vi.fn()],
      };
    });

    const { unmock } = vi;

    const mockSetBody = vi.fn();
    render(<BodyEditor body="example text" setBody={mockSetBody} />);

    expect(screen.getByText('Plain Text')).toBeInTheDocument();

    unmock('react');
  });
});
