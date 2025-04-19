import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import RestClientPage from '@/app/[locale]/restful-client/[method]/[[...rest]]/page';
import { HttpMethod, RequestParams, ResponseData } from '@/types';
import messages from '@/../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';
import { Routes } from '@/types/routes';
import {
  expectedRequest,
  mockParams,
  mockSearchParams,
} from './__mocks__/mock-restful-client';

vi.mock('@/components/page-wrapper', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-wrapper">{children}</div>
  ),
}));

vi.mock('@/components/restful-client-component', () => ({
  LazyClientComponent: ({
    response,
    request,
  }: {
    response: ResponseData;
    request: RequestParams;
  }) => (
    <div data-testid="client-component">
      {JSON.stringify({ response, request })}
    </div>
  ),
}));

vi.mock('@/i18n/navigation', () => ({
  redirect: vi.fn(),
  Routes: {
    NOT_FOUND: '/not-found',
  },
}));

vi.mock('@/helpers/get-response', () => ({
  getResponse: vi.fn().mockResolvedValue({ data: 'mock response' }),
}));

vi.mock('@/utils/code64', () => ({
  base64UrlDecode: vi
    .fn()
    .mockImplementation((input: string) => `decoded-${input}`),
}));

vi.mock('@/helpers/get-variables-cookies', () => ({
  getVariablesAsEditorItemsFromCookies: vi.fn().mockResolvedValue([]),
}));

vi.mock('@/utils/prepare-request', () => ({
  prepareRequestData: vi.fn().mockImplementation((data) => data),
}));

describe('RestClientPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders PageWrapper and LazyClientComponent with correct props', async () => {
    const Component = await RestClientPage({
      params: Promise.resolve(mockParams),
      searchParams: Promise.resolve(mockSearchParams),
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();

    const clientComponent = screen.getByTestId('client-component');
    expect(clientComponent).toBeInTheDocument();

    const props = JSON.parse(clientComponent.textContent || '');
    expect(props.request).toEqual(expectedRequest);
    expect(props.response).toEqual({ data: 'mock response' });
  });

  it('handles missing rest parameter', async () => {
    const Component = await RestClientPage({
      params: Promise.resolve({ ...mockParams, rest: undefined }),
      searchParams: Promise.resolve(mockSearchParams),
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>
    );

    const clientComponent = screen.getByTestId('client-component');
    const props = JSON.parse(clientComponent.textContent || '');

    expect(props.request.url).toBe('');
    expect(props.request.body).toBe('');
    expect(props.response).toBeNull();
  });

  it('redirects to not-found for invalid HTTP method', async () => {
    const invalidMethod = 'INVALID' as HttpMethod;
    await RestClientPage({
      params: Promise.resolve({ ...mockParams, method: invalidMethod }),
      searchParams: Promise.resolve(mockSearchParams),
    });

    const { redirect } = await import('@/i18n/navigation');
    expect(redirect).toHaveBeenCalledWith({
      href: Routes.NOT_FOUND,
      locale: mockParams.locale,
    });
  });

  it('properly decodes URL and body parameters', async () => {
    const { base64UrlDecode } = await import('@/utils/code64');
    await RestClientPage({
      params: Promise.resolve(mockParams),
      searchParams: Promise.resolve(mockSearchParams),
    });

    expect(base64UrlDecode).toHaveBeenCalledWith('encodedUrl');
    expect(base64UrlDecode).toHaveBeenCalledWith('encodedBody');
  });

  it('processes headers correctly from searchParams', async () => {
    const Component = await RestClientPage({
      params: Promise.resolve(mockParams),
      searchParams: Promise.resolve({
        'content-type': 'application/json',
        authorization: ['Bearer token'],
        body: 'ignored',
      }),
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {Component}
      </NextIntlClientProvider>
    );

    const clientComponent = screen.getByTestId('client-component');
    const props = JSON.parse(clientComponent.textContent || '');

    expect(props.request.headers).toEqual([
      { key: 'content-type', value: 'application/json' },
      { key: 'authorization', value: 'Bearer token' },
    ]);
  });

  it('calls prepareRequestData with correct arguments', async () => {
    const mockVariables = [{ key: 'var1', value: 'value1' }];
    const mockGetVariables = await import('@/helpers/get-variables-cookies');

    vi.mocked(
      mockGetVariables.getVariablesAsEditorItemsFromCookies
    ).mockResolvedValueOnce(mockVariables);

    await RestClientPage({
      params: Promise.resolve(mockParams),
      searchParams: Promise.resolve(mockSearchParams),
    });

    const { prepareRequestData } = await import('@/utils/prepare-request');
    expect(prepareRequestData).toHaveBeenCalledWith(
      expectedRequest,
      mockVariables
    );
  });
});
