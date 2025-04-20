import { HttpMethod } from '@/types';

export const decodeRouteParams = () => {
  if (typeof window === 'undefined') return {};

  const pathname = window.location.pathname;
  const search = window.location.search;
  const segments = pathname.split('/').filter(Boolean);

  const method = segments[2] as HttpMethod;
  const encodedUrl = segments[3];
  const encodedBody = segments[4];

  let url = '';
  let body = '';
  const headers: Record<string, string> = {};

  try {
    if (encodedUrl) url = atob(decodeURIComponent(encodedUrl));
  } catch {}

  try {
    if (encodedBody) body = atob(decodeURIComponent(encodedBody));
  } catch {}

  const searchParams = new URLSearchParams(search);
  for (const [key, value] of searchParams.entries()) {
    headers[key] = value;
  }

  return {
    method,
    url,
    body,
    headers,
  };
};
