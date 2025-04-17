import { HttpMethod } from '.';

export const Routes = {
  MAIN: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VARIABLES: '/variables',
  HISTORY: '/history',
  NOT_FOUND: '/not-found',
  RESTFUL_CLIENT: (method: HttpMethod) => `restful-client/${method}`,
  RESTFUL_CLIENT_REQUEST: (
    method: HttpMethod,
    encodedUrl: string,
    encodedBody?: string,
    headers?: Record<string, string>
  ) => {
    let path = `/restful-client/${method}/${encodedUrl}`;
    if (encodedBody) {
      path += `/${encodedBody}`;
    }
    if (headers) {
      const params = new URLSearchParams();
      Object.entries(headers).forEach(([key, value]) => {
        params.append(key, value);
      });
      path += `?${params.toString()}`;
    }
    return path;
  },
} as const;
