import { useState } from 'react';
import type { RequestParams, ResponseData } from '@/types';
import { useTranslations } from 'next-intl';
import { isJSON, isValidUrl } from '../utils/request-validation';
import { base64UrlEncode } from '@/utils/code64';
import { Routes } from '@/types/routes';
import { useRouter } from '@/i18n/navigation';

export const useRequest = () => {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const router = useRouter();
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

      const headerParams = headers.reduce(
        (acc, { key, value }) => {
          if (key.trim()) acc[key] = value;
          return acc;
        },
        {} as Record<string, string>
      );

      let encodedBody: string | undefined;
      try {
        const parsed = JSON.parse(body);
        const normalized = JSON.stringify(parsed);
        encodedBody = base64UrlEncode(normalized);
      } catch {
        encodedBody = body ? base64UrlEncode(body) : undefined;
      }

      const newPath = Routes.REST_CLIENT_REQUEST(
        method,
        base64UrlEncode(url),
        encodedBody,
        headerParams
      );

      router.replace(newPath, { scroll: false });
    } catch {
      setResponse({
        status: 500,
        headers: [],
        body: JSON.stringify({ message: t('unknownErrorMessage') }),
      });
    }
  };

  return { response, sendRequest };
};
