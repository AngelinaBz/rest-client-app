'use client';

import { useRouter } from '@/i18n/navigation';
import { RequestParams } from '@/types';
import { prepareRequestData } from '@/utils/prepare-request';
import useVariablesLocalStorage from './use-variables-localstorage';
import { useHistoryLocalStorage } from './use-history-localstorage';
import { addRequestToHistory } from '@/utils/history-utils';
import { buildRequestPath } from '@/utils/request-path';

export const useNavigateToRequestURL = () => {
  const router = useRouter();
  const [variables] = useVariablesLocalStorage();
  const [, setHistory] = useHistoryLocalStorage();

  return (request: RequestParams) => {
    const finalRequest = prepareRequestData(request, variables);

    addRequestToHistory(finalRequest, variables, setHistory);

    const path = buildRequestPath(request);

    router.replace(path, { scroll: false });
  };
};
