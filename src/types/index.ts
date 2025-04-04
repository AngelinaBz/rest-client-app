import { ReactNode } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
  params: Promise<Params>;
};

export type Params = {
  locale: string;
};

export { ERROR_MAP, Status } from './error-page-status-types';

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

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
