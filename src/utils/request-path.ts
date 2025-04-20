import { RequestParams } from '@/types';
import { base64UrlEncode } from './code64';
import { Routes } from '@/types/routes';

export const buildRequestPath = (request: RequestParams): string => {
  const encodedUrl = base64UrlEncode(request.url);
  const encodedBody = request.body ? base64UrlEncode(request.body) : undefined;

  const headerParams = request.headers.reduce(
    (acc, { key, value }) => {
      if (key.trim()) acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return Routes.RESTFUL_CLIENT_REQUEST(
    request.method,
    encodedUrl,
    encodedBody,
    headerParams
  );
};
