export const Routes = {
  MAIN: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  VARIABLES: '/variables',
  HISTORY: '/history',
  RESTFUL_CLIENT: (method: HTTPMethod) => `/${method}`,
} as const;
