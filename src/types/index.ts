import { ReactNode } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
  params: Params;
};

export type Params = {
  locale: string;
};
