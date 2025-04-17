'use client';

import { useRouter } from '@/i18n/navigation';
import { RequestParams, RequestHistoryParams } from '@/types';
import { Routes } from '@/types/routes';
import { base64UrlEncode } from '@/utils/code64';
import { prepareRequestData } from '@/utils/prepare-request';
import useVariablesLocalStorage from './use-variables-localstorage';
import { useHistoryLocalStorage } from './use-history-localstorage';

export const useNavigateToRequestURL = () => {
  const router = useRouter();
  const [variables] = useVariablesLocalStorage();
  const [, setHistory] = useHistoryLocalStorage();

  return (request: RequestParams) => {
    const finalRequest = prepareRequestData(request, variables);

    const requestHistory: RequestHistoryParams = {
      ...finalRequest,
      timestamp: new Date().toString(),
    };
    setHistory((prev = []) => [...prev, requestHistory]);

    const headerParams = finalRequest.headers.reduce(
      (acc, { key, value }) => {
        if (key.trim()) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const encodedUrl = base64UrlEncode(finalRequest.url);
    const encodedBody = finalRequest.body
      ? base64UrlEncode(finalRequest.body)
      : undefined;

    const path = Routes.RESTFUL_CLIENT_REQUEST(
      finalRequest.method,
      encodedUrl,
      encodedBody,
      headerParams
    );

    router.replace(path, { scroll: false });
  };
};
