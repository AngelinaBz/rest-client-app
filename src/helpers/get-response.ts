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

  try {
    const response = await fetch(url, {
      method,
      headers: validHeaders,
      body: method !== 'GET' ? body : undefined,
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
  } catch {
    return {
      status: 500,
      headers: [],
      body: JSON.stringify({ message: 'Unknown Error' }),
    };
  }
};
