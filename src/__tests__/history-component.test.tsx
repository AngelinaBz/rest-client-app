import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HistoryComponent from '@/components/history-component';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RequestHistoryParams } from '@/types';
import { mockGetRequest, mockPostRequest } from './__mocks__/mock-history';

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
    mockHistory.push(mockGetRequest);

    render(<HistoryComponent />);
    expect(
      screen.getByText(`${mockGetRequest.method} ${mockGetRequest.url}`)
    ).toBeInTheDocument();
  });

  it('shows empty message', async () => {
    render(<HistoryComponent />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('toggles sort order', async () => {
    mockHistory.push(mockGetRequest, mockPostRequest);

    render(<HistoryComponent />);

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent(
        `${mockGetRequest.method} ${mockGetRequest.url}`
      );
      expect(items[1]).toHaveTextContent(
        `${mockPostRequest.method} ${mockPostRequest.url}`
      );
    });

    const sortBtn = screen.getAllByRole('button')[0];
    fireEvent.click(sortBtn);

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveTextContent(
        `${mockPostRequest.method} ${mockPostRequest.url}`
      );
      expect(items[1]).toHaveTextContent(
        `${mockGetRequest.method} ${mockGetRequest.url}`
      );
    });
  });
});
