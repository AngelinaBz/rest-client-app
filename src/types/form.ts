export const FORM = {
  signIn: 'signIn',
  signUp: 'signUp',
} as const;

export type FormType = (typeof FORM)[keyof typeof FORM];
