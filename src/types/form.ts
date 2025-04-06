export const FORM = {
  signIn: 'signIn',
  signUp: 'signUp',
} as const;

export type FormType = (typeof FORM)[keyof typeof FORM];

export const USER = {
  email: 'email',
  password: 'password',
} as const;

export type User = {
  [USER.email]: string;
  [USER.password]: string;
};

export type UserKey = keyof User;
