'use client';

export { default } from './restful-client-component';
import dynamic from 'next/dynamic';
import { Loader } from '@/components/loader';

export const LazyClientComponent = dynamic(
  () => import('./restful-client-component'),
  {
    loading: () => <Loader marginTop="30vh" />,
    ssr: false,
  }
);
