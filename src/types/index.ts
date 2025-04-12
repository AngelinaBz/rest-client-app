import { ReactNode } from 'react';

export interface ChildrenProps {
  children: ReactNode;
}

export interface RootLayoutProps extends ChildrenProps {
  params: Promise<Params>;
}

export type Params = {
  locale: string;
};

export type EditorItem = {
  key: string;
  value: string;
};

export { Status } from './error-page-status-types';
export type { StatusType, ErrorMeta } from './error-page-status-types';

export const HTTP_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type ResponseData = {
  status: number;
  headers: { key: string; value: string }[];
  body: string;
};

export interface RequestParams {
  method: HttpMethod;
  url: string;
  headers: { key: string; value: string }[];
  body: string;
}

export interface RequestHistoryParams extends RequestParams {
  timestamp: string;
}
