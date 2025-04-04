'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { Spin } from 'antd';

const RestfulClientComponent = dynamic(
  () => import('@/components/restful-client-component'),
  { ssr: false }
);

export default function RestClientPage() {
  return (
    <PageWrapper>
      <Suspense
        fallback={
          <Spin
            size="large"
            style={{ display: 'block', margin: '50px auto' }}
          />
        }
      >
        <RestfulClientComponent />
      </Suspense>
    </PageWrapper>
  );
}
