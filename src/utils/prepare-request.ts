import { EditorItem, RequestParams } from '@/types';

export const replaceVariables = (
  str: string,
  variablesMap: Record<string, string>
): string => {
  return str.replace(/{{(.*?)}}/g, (_, variableName) => {
    return variablesMap[variableName.trim()] || `{{${variableName}}}`;
  });
};

export const prepareRequestData = (
  request: RequestParams,
  variables: EditorItem[]
): RequestParams => {
  const variablesMap = variables.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  const replacedUrl = replaceVariables(request.url, variablesMap);
  const replacedHeaders = request.headers.map((h) => ({
    ...h,
    value: replaceVariables(h.value, variablesMap),
  }));
  const replacedBody = request.body
    ? replaceVariables(request.body, variablesMap)
    : request.body;

  return {
    ...request,
    url: replacedUrl,
    headers: replacedHeaders,
    body: replacedBody,
  };
};
