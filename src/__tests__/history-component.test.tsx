import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HistoryComponent from '@/components/history-component';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RequestHistoryParams } from '@/types';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/utils/format-date', () => ({
  formatDate: (date: string) => `${date}`,
}));

const mockSetHistory = vi.fn();
let mockHistory: RequestHistoryParams[] = [];

vi.mock('@/hooks/use-history-localstorage', () => ({
  useHistoryLocalStorage: () => [mockHistory, mockSetHistory],
}));

describe('HistoryComponent', () => {
  beforeEach(() => {
    mockHistory = [];
    mockSetHistory.mockClear();
  });

  it('renders history list', async () => {
    mockHistory.push({
      method: 'GET',
      url: '/test',
      timestamp: '2025-01-01',
      headers: [],
      body: '',
    });

    render(<HistoryComponent />);

    expect(screen.getByText('GET /test')).toBeInTheDocument();
  });

  it('shows empty message', async () => {
    render(<HistoryComponent />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('toggles sort order', async () => {
    mockHistory.push(
      {
        method: 'GET',
        url: '/test/1',
        timestamp: '2025-01-01',
        headers: [],
        body: '',
      },
      {
        method: 'POST',
        url: '/test/2',
        timestamp: '2024-01-01',
        headers: [],
        body: '',
      }
    );

    render(<HistoryComponent />);

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('GET /test/1');
      expect(items[1]).toHaveTextContent('POST /test/2');
    });

    const sortBtn = screen.getAllByRole('button')[0];
    fireEvent.click(sortBtn);

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent('POST /test/2');
      expect(items[1]).toHaveTextContent('GET /test/1');
    });
  });
});
