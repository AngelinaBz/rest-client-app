import { HttpMethod, RequestParams, ResponseData } from '@/types';
import { TabsItem } from '@/types/tabs';
import { Locale } from 'next-intl';

export const mockRequest: RequestParams = {
  method: 'GET',
  url: 'https://api.example.com',
  headers: [{ key: 'Content-Type', value: 'application/json' }],
  body: JSON.stringify({ test: 'data' }),
};

export const mockResponse: ResponseData = {
  status: 200,
  body: '{"message":"Success"}',
  headers: [],
};

export const mockParams = {
  locale: 'en' as Locale,
  method: 'GET' as HttpMethod,
  rest: ['encodedUrl', 'encodedBody'],
};

export const mockSearchParams = {
  header1: 'value1',
  header2: ['value2'],
  body: 'test-body',
};

export const expectedRequest = {
  method: 'GET',
  url: 'decoded-encodedUrl',
  body: 'decoded-encodedBody',
  headers: [
    { key: 'header1', value: 'value1' },
    { key: 'header2', value: 'value2' },
  ],
};

export const mockTabs: TabsItem[] = [
  {
    key: 'headers',
    label: 'Headers',
    children: <div data-testid="headers-tab">Headers Content</div>,
  },
  {
    key: 'body',
    label: 'Body',
    children: <div data-testid="body-tab">Body Content</div>,
  },
];
