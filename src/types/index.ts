import { Locale } from 'next-intl';
import { ReactNode } from 'react';

export interface ChildrenProps {
  children: ReactNode;
}

export interface RootLayoutProps extends ChildrenProps {
  params: Promise<Params>;
}

export type Params = {
  locale: Locale;
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

export const DEFAULT_HTTP_METHOD: HttpMethod = 'GET';

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

export { LANGUAGES } from './code-language-types';
export type { LanguageKey } from './code-language-types';
