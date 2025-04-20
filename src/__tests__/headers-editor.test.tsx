import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeadersEditor } from '@/components/headers-editor';
import { EditorItem } from '@/types';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/../messages/en.json';

vi.mock('next-intl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl')>();
  return {
    ...actual,
    useTranslations:
      (namespace: keyof typeof messages) =>
      (key: keyof (typeof messages)[typeof namespace]) =>
        messages[namespace][key],
  };
});

vi.mock('@ant-design/icons', () => ({
  DeleteOutlined: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} data-testid="delete-button">
      ×
    </button>
  ),
}));

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>();
  return {
    ...actual,
    AutoComplete: ({
      placeholder,
      value,
      onChange,
    }: {
      placeholder: string;
      value: string;
      onChange: (value: string) => void;
    }) => (
      <input
        data-testid={placeholder.includes('Key') ? 'key-input' : 'value-input'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});

describe('HeadersEditor Component', () => {
  const mockHeaders: EditorItem[] = [
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Authorization', value: 'Bearer token' },
  ];

  const mockSetHeaders = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with existing headers', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HeadersEditor headers={mockHeaders} setHeaders={mockSetHeaders} />
      </NextIntlClientProvider>
    );

    const keyInputs = screen.getAllByTestId('key-input');
    const valueInputs = screen.getAllByTestId('value-input');

    expect(keyInputs.length).toBe(mockHeaders.length);
    expect(valueInputs.length).toBe(mockHeaders.length);

    mockHeaders.forEach((header, index) => {
      expect(keyInputs[index]).toHaveValue(header.key);
      expect(valueInputs[index]).toHaveValue(header.value);
    });
  });

  it('adds a new header when button is clicked', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HeadersEditor
          headers={[] as EditorItem[]}
          setHeaders={mockSetHeaders}
        />
      </NextIntlClientProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /add header/i }));
    expect(mockSetHeaders).toHaveBeenCalledWith({ type: 'add' });
  });

  it('updates header key when changed', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HeadersEditor headers={mockHeaders} setHeaders={mockSetHeaders} />
      </NextIntlClientProvider>
    );

    const keyInputs = screen.getAllByTestId('key-input');
    fireEvent.change(keyInputs[0], { target: { value: 'New-Key' } });

    expect(mockSetHeaders).toHaveBeenCalledWith({
      type: 'update',
      payload: { index: 0, key: 'New-Key', value: mockHeaders[0].value },
    });
  });

  it('updates header value when changed', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HeadersEditor headers={mockHeaders} setHeaders={mockSetHeaders} />
      </NextIntlClientProvider>
    );

    const valueInputs = screen.getAllByTestId('value-input');
    fireEvent.change(valueInputs[1], { target: { value: 'new-value' } });

    expect(mockSetHeaders).toHaveBeenCalledWith({
      type: 'update',
      payload: { index: 1, key: mockHeaders[1].key, value: 'new-value' },
    });
  });

  it('deletes a header when delete button is clicked', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HeadersEditor headers={mockHeaders} setHeaders={mockSetHeaders} />
      </NextIntlClientProvider>
    );

    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);

    expect(mockSetHeaders).toHaveBeenCalledWith({
      type: 'remove',
      payload: { index: 0 },
    });
  });
});
