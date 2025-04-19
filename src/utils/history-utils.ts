import { RequestParams, RequestHistoryParams, EditorItem } from '@/types';
import { prepareRequestData } from './prepare-request';

export const addRequestToHistory = (
  request: RequestParams,
  variables: EditorItem[],
  setHistory: (
    updater: (prev?: RequestHistoryParams[]) => RequestHistoryParams[]
  ) => void
): void => {
  const finalRequest = prepareRequestData(request, variables);

  const requestHistory: RequestHistoryParams = {
    ...finalRequest,
    timestamp: new Date().toString(),
  };

  setHistory((prev = []) => [...prev, requestHistory]);
};
