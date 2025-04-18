'use client';

import { useRouter } from '@/i18n/navigation';
import { RequestParams } from '@/types';
import { prepareRequestData } from '@/utils/prepare-request';
import useVariablesLocalStorage from './use-variables-localstorage';
import { useHistoryLocalStorage } from './use-history-localstorage';
import { addRequestToHistory } from '@/utils/history-utils';
import { buildRequestPath } from '@/utils/request-path';
import { setCookie } from 'cookies-next';

export const useNavigateToRequestURL = () => {
  const router = useRouter();
  const [variables] = useVariablesLocalStorage();
  const [, setHistory] = useHistoryLocalStorage();

  return (originalRequest: RequestParams) => {
    const finalRequest = prepareRequestData(originalRequest, variables);

    addRequestToHistory(finalRequest, variables, setHistory);

    variables.forEach(({ key, value }) => {
      if (key && value) {
        setCookie(`rest_var_${key}`, value);
      }
    });

    const path = buildRequestPath(originalRequest);

    router.replace(path, { scroll: false });
  };
};
