import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MethodSelector } from '@/components/method-selector';
import { HTTP_METHODS } from '@/types';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('MethodSelector Component', () => {
  const mockSetMethod = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the current method selected', () => {
    render(<MethodSelector method="GET" setMethod={mockSetMethod} />);

    const selected = document.querySelector('.ant-select-selection-item');
    expect(selected?.textContent).toBe('GET');
  });

  it('shows all HTTP methods when clicked', async () => {
    render(<MethodSelector method="GET" setMethod={mockSetMethod} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    await waitFor(() => {
      HTTP_METHODS.forEach((method) => {
        expect(document.body.textContent).toContain(method);
      });
    });
  });

  it('calls setMethod when a different option is selected', async () => {
    render(<MethodSelector method="GET" setMethod={mockSetMethod} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    await waitFor(() => {
      const postOption = document.body.querySelector('div[title="POST"]');
      expect(postOption).toBeTruthy();
      fireEvent.click(postOption!);
    });

    expect(mockSetMethod.mock.calls[0][0]).toBe('POST');
  });

  it('has proper accessibility attributes', () => {
    render(<MethodSelector method="GET" setMethod={mockSetMethod} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-label', 'method-selector');
  });
});
