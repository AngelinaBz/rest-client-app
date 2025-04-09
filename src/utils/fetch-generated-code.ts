import { RequestParams } from '@/types';

export const fetchGeneratedCode = ({
  url,
  method,
  headers,
  body,
}: RequestParams): string => {
  if (!url || !method || !headers || !body) {
    return 'Please provide url, method, headers and body';
  }
  return 'not implemented yet';
};
