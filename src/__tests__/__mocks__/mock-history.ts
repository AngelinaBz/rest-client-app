import { RequestHistoryParams } from '@/types';

export const mockGetRequest: RequestHistoryParams = {
  method: 'GET',
  url: '/test/1',
  timestamp: '2025-01-01',
  headers: [],
  body: '',
};

export const mockPostRequest: RequestHistoryParams = {
  method: 'POST',
  url: '/test/2',
  timestamp: '2024-01-01',
  headers: [],
  body: '',
};
