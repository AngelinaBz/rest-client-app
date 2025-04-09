export const Status = {
  404: '404',
  500: '500',
  403: '403',
  error: 'error',
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

export type ErrorMeta = {
  title: string;
  subTitle: string;
  buttonText: string;
};
