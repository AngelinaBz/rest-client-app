export const headersMap: Record<string, string[]> = {
  'Content-Type': [
    'application/json',
    'application/xml',
    'text/plain',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
  ],
  Accept: [
    'application/json',
    'application/xml',
    'text/html',
    'text/plain',
    '*/*',
  ],
  Authorization: ['Bearer <token>', 'Basic <base64-credentials>'],
  'Cache-Control': ['no-cache', 'no-store', 'max-age=0', 'must-revalidate'],
  'x-api-key': ['your-api-key-here'],
  'User-Agent': ['CustomClient/1.0'],
  'Accept-Encoding': ['gzip', 'deflate', 'br'],
  'Accept-Charset': ['utf-8', 'iso-8859-1'],
  'Keep-Alive': ['timeout=5, max=100'],
};
