import { useState } from 'react';
import type { RequestParams, ResponseData } from '@/types';
import { useTranslations } from 'next-intl';
import { isJSON, isValidUrl } from '../utils/request-validation';

export const useRequest = () => {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const t = useTranslations('RestfulClient');

  const sendRequest = async ({ method, url, headers, body }: RequestParams) => {
    const validHeaders = Object.fromEntries(
      headers.filter((h) => h.key.trim() !== '').map((h) => [h.key, h.value])
    );

    if (!isValidUrl(url)) {
      setResponse({
        status: 0,
        headers: [],
        body: JSON.stringify({ message: t('invalidUrlMessage') }),
      });
      return;
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

      setResponse(formattedResponse);
    } catch (error) {
      if (error instanceof Error) {
        setResponse({
          status: 500,
          headers: [],
          body: JSON.stringify({ message: error.message }),
        });
      } else {
        setResponse({
          status: 500,
          headers: [],
          body: JSON.stringify({ message: t('unknownErrorMessage') }),
        });
      }
    }
  };

  return { response, sendRequest };
};
