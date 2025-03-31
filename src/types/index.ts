import { ReactNode } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
  params: Promise<Params>;
};

export type Params = {
  locale: string;
};
