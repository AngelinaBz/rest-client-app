import type { RequestParams, ResponseData } from '@/types';
import { isJSON, isValidUrl } from '../utils/request-validation';

export const getResponse = async ({
  method,
  url,
  headers,
  body,
}: RequestParams): Promise<ResponseData> => {
  const validHeaders = Object.fromEntries(
    headers.filter((h) => h.key.trim() !== '').map((h) => [h.key, h.value])
  );

  if (!isValidUrl(url)) {
    return {
      status: 0,
      headers: [],
      body: JSON.stringify({ message: 'Invalid URL' }),
    };
  }

  const hasBody = method !== 'GET' && method !== 'HEAD';
  const shouldAddJsonHeader =
    Object.keys(validHeaders).length === 0 &&
    hasBody &&
    typeof body === 'string' &&
    body.trim().length > 0;

  if (shouldAddJsonHeader && !('Content-Type' in validHeaders)) {
    validHeaders['Content-Type'] = 'application/json';
  }
  try {
    const response = await fetch(url, {
      method,
      headers: validHeaders,
      body: hasBody ? body : undefined,
    });

    const responseBody = await response.text();
    const parsedBody = isJSON(responseBody)
      ? JSON.parse(responseBody)
      : responseBody;

    const formattedHeaders = Array.from(response.headers.entries()).map(
      ([key, value]) => ({
        key,
        value,
      })
    );

    const formattedResponse: ResponseData = {
      status: response.status,
      headers: formattedHeaders,
      body:
        typeof parsedBody === 'string'
          ? parsedBody
          : JSON.stringify(parsedBody, null, 2),
    };

    return formattedResponse;
  } catch (error: unknown) {
    const sslRegex =
      /self signed certificate|certificate|SSL|UNABLE_TO_VERIFY/i;

    if (error instanceof Error) {
      const causeMessage = (error as Error & { cause?: { message?: string } })
        .cause?.message;

      if (sslRegex.test(error.message) || sslRegex.test(causeMessage || '')) {
        return {
          status: 495,
          headers: [],
          body: JSON.stringify({
            message: causeMessage?.trim().length
              ? causeMessage
              : 'SSL Certificate Error',
          }),
        };
      }

      return {
        status: 500,
        headers: [],
        body: JSON.stringify({
          message: error.message || 'Internal Server Error',
        }),
      };
    }

    return {
      status: 500,
      headers: [],
      body: JSON.stringify({ message: 'An unknown error occurred.' }),
    };
  }
};
