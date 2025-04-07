export const Routes = {
  MAIN: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VARIABLES: '/variables',
  HISTORY: '/history',
  RESTFUL_CLIENT: (method: HTTPMethod) => `/${method}`,
} as const;

export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export type RestfulClientParams = {
  method: HTTPMethod;
  url: string;
  body?: string;
};
