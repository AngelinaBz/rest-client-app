import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import RestfulClient from '@/components/restful-client-component';
import { ResponseData } from '@/types';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/../messages/en.json';
import {
  mockRequest,
  mockResponse,
  mockTabs,
} from './__mocks__/mock-restful-client';

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

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default:
    () =>
    ({ response }: { response: ResponseData | null }) => (
      <div data-testid="response-viewer">
        {response ? response.body : 'null'}
      </div>
    ),
}));

vi.mock('@/hooks/use-editor-items', () => ({
  default: () => [
    [],
    vi.fn((action) => {
      if (action.type === 'addAll') {
        return action.payload;
      }
    }),
  ],
}));

vi.mock('@/hooks/use-navigate-to-request-url', () => ({
  useNavigateToRequestURL: () => vi.fn(),
}));

vi.mock('@/helpers/get-tabs', () => ({ getTabs: () => mockTabs }));

describe('RestfulClient Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with initial props', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestfulClient response={mockResponse} request={mockRequest} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(messages.RestfulClient.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockRequest.url)).toBeInTheDocument();
  });

  it('displays response data correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestfulClient response={mockResponse} request={mockRequest} />
      </NextIntlClientProvider>
    );

    const responseViewer = screen.getByTestId('response-viewer');
    expect(responseViewer.textContent).toBe(mockResponse.body);
  });

  it('handles empty response', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestfulClient response={null} request={mockRequest} />
      </NextIntlClientProvider>
    );

    const responseViewer = screen.getByTestId('response-viewer');
    expect(responseViewer.textContent).toBe('null');
  });

  it('renders tabs correctly', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestfulClient response={mockResponse} request={mockRequest} />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /headers/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /body/i })).toBeInTheDocument();
    });
  });

  it('handles empty response', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestfulClient response={null} request={mockRequest} />
      </NextIntlClientProvider>
    );

    const responseViewer = screen.getByTestId('response-viewer');
    expect(responseViewer.textContent).toBe('null');
  });
});
