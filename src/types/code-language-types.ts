export const LANGUAGES = [
  {
    key: 'curl',
    label: 'cURL',
    target: 'curl',
  },
  {
    key: 'javascript_fetch',
    label: 'JavaScript (Fetch)',
    target: 'javascript',
    client: 'fetch',
  },
  {
    key: 'javascript_xhr',
    label: 'JavaScript (XHR)',
    target: 'javascript',
    client: 'xhr',
  },
  {
    key: 'nodejs',
    label: 'NodeJS',
    target: 'node',
    client: 'native',
  },
  {
    key: 'python',
    label: 'Python',
    target: 'python',
    client: 'requests',
  },
  {
    key: 'java',
    label: 'Java',
    target: 'java',
    client: 'okhttp',
  },
  {
    key: 'csharp',
    label: 'C#',
    target: 'csharp',
    client: 'httpclient',
  },
  {
    key: 'go',
    label: 'Go',
    target: 'go',
    client: 'native',
  },
] as const;

export type LanguageKey = (typeof LANGUAGES)[number]['key'];
export type LanguageInfo = (typeof LANGUAGES)[number];
