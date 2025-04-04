import { ReactNode } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
  params: Promise<Params>;
};

export type Params = {
  locale: string;
};

export { ERROR_MAP, Status } from './error-page-status-types';
