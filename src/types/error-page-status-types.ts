export const Status = {
  404: '404',
  500: '500',
  403: '403',
  error: 'error',
} as const;

export type StatusType = (typeof Status)[keyof typeof Status];

type ErrorMeta = {
  title: string;
  subTitle: string;
};

export const ERROR_MAP: Record<StatusType, ErrorMeta> = {
  [Status[404]]: {
    title: '404',
    subTitle: 'Sorry, the page you visited does not exist.',
  },
  [Status[500]]: {
    title: '500',
    subTitle: 'Sorry, something went wrong.',
  },
  [Status[403]]: {
    title: '403',
    subTitle: '="Sorry, you are not authorized to access this page.',
  },
  [Status.error]: {
    title: 'Error',
    subTitle: 'An unexpected error occurred.',
  },
};
