import HTTPSnippet from 'httpsnippet';
import { RequestParams, LANGUAGES, LanguageKey } from '@/types';
import { generateCurlCode } from './generate-curl-codes';
import { LanguageInfo } from '@/types/code-language-types';
import { replaceVariables } from './prepare-request';
import { getVariablesAsMapFromCookiesClient } from './get-variables-map';

export const fetchGeneratedCode = async (
  params: RequestParams,
  language: LanguageKey
): Promise<string> => {
  const { url, method, headers = [], body } = params;
  if (!url || !method) return '';

  const variables = getVariablesAsMapFromCookiesClient();

  const replacedUrl = replaceVariables(url, variables);
  const replacedBody = body ? replaceVariables(body, variables) : undefined;
  const replacedHeaders = headers.map((h) => ({
    key: replaceVariables(h.key, variables),
    value: replaceVariables(h.value, variables),
  }));

  const harRequest = {
    method,
    url: replacedUrl,
    httpVersion: 'HTTP/1.1',
    headers: replacedHeaders
      .filter((h) => h.key)
      .map((h) => ({
        name: h.key,
        value: h.value,
      })),
    ...(replacedBody
      ? {
          postData: {
            mimeType: 'application/json',
            text: replacedBody,
          },
        }
      : {}),
  };

  const snippet = new HTTPSnippet(harRequest);

  if (language === 'curl') {
    return generateCurlCode({
      url: replacedUrl,
      method,
      headers: replacedHeaders,
      body: replacedBody || '',
    });
  }

  const langInfo = LANGUAGES.find(
    (lang: LanguageInfo) => lang.key === language
  );
  if (!langInfo) return 'Unsupported language';

  const code =
    'client' in langInfo && langInfo.client
      ? snippet.convert(langInfo.target, langInfo.client)
      : snippet.convert(langInfo.target);

  return code || 'Code generation failed';
};
