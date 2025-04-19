import { RequestParams } from '@/types';

export const normalizeHeaders = (
  headers: { key: string; value: string }[] = []
): Record<string, string> =>
  headers.reduce(
    (acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

export const generateCurlCode = ({
  url,
  method,
  headers = [],
  body = '',
}: RequestParams): string => {
  const headerObj = normalizeHeaders(headers);
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());

  const lines = [`curl -X ${method.toUpperCase()} "${url}"`];

  const headerLines = Object.entries(headerObj).map(
    ([key, value]) => `-H "${key}: ${value}"`
  );
  lines.push(...headerLines);

  if (hasBody && body) {
    const safeBody = JSON.stringify(JSON.parse(body));
    lines.push(`-d '${safeBody}'`);
  }

  return lines.join(' \\\n');
};
