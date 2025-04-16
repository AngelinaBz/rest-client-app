import HTTPSnippet from 'httpsnippet';
import { RequestParams, LANGUAGES, LanguageKey } from '@/types';
import { generateCurlCode } from './generate-curl-codes';

export const fetchGeneratedCode = (
  params: RequestParams,
  language: LanguageKey
): string => {
  const { url, method, headers = [], body } = params;
  if (!url || !method) return '';

  const harRequest = {
    method,
    url,
    httpVersion: 'HTTP/1.1',
    headers: headers
      .filter((h) => h.key)
      .map((h) => ({ name: h.key, value: h.value })),
    ...(body
      ? {
          postData: {
            mimeType: 'application/json',
            text: body,
          },
        }
      : {}),
  };

  const snippet = new HTTPSnippet(harRequest);

  if (language === 'curl') {
    return generateCurlCode(params);
  }

  const langInfo = LANGUAGES.find(
    (lang: { key: LanguageKey; target: string; client?: string }) =>
      lang.key === language
  );
  if (!langInfo) return 'Unsupported language';

  const code =
    'client' in langInfo && langInfo.client
      ? snippet.convert(langInfo.target, langInfo.client)
      : snippet.convert(langInfo.target);

  return code || 'Code generation failed';
};
