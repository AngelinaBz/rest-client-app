import { render, screen, fireEvent } from '@testing-library/react';
import { URLInput } from '@/components/url-input';
import { describe, expect, it, vi } from 'vitest';

const mockUrl = 'https://example.com';
const mockNewUrl = 'https://new-url.com';
const placeholderText = 'Enter URL';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => {
    if (key === 'urlInputPlaceholder') return placeholderText;
    return key;
  },
}));

describe('URLInput Component', () => {
  const mockSetUrl = vi.fn();

  it('renders with the correct placeholder and value', () => {
    render(<URLInput url={mockUrl} setUrl={mockSetUrl} />);
    const input = screen.getByPlaceholderText(
      placeholderText
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe(mockUrl);
  });

  it('calls setUrl on input change', () => {
    render(<URLInput url="" setUrl={mockSetUrl} />);
    const input = screen.getByPlaceholderText(placeholderText);

    fireEvent.change(input, { target: { value: mockNewUrl } });

    expect(mockSetUrl).toHaveBeenCalledWith(mockNewUrl);
  });
});
