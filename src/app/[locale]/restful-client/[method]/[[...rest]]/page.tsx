'use client';

import dynamic from 'next/dynamic';
import { Suspense, use } from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { Spin } from 'antd';
import { redirect } from '@/i18n/navigation';
import { HTTP_METHODS, HttpMethod } from '@/types';
import { Routes } from '@/types/routes';
import { useSearchParams } from 'next/navigation';

const RestfulClientComponent = dynamic(
  () => import('@/components/restful-client-component'),
  { ssr: false }
);

type RestClientPageProps = {
  params: Promise<{ locale: 'en' | 'ru'; method: HttpMethod; rest?: string[] }>;
};

export default function RestClientPage({
  params,
}: RestClientPageProps): React.JSX.Element {
  const { locale, method, rest } = use(params);
  const searchParams = useSearchParams();

  const initialHeaders = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'body')
    .map(([key, value]) => ({ key, value }));

  if (!HTTP_METHODS.includes(method)) {
    redirect({
      href: Routes.NOT_FOUND,
      locale: locale,
    });
  }
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
        <RestfulClientComponent
          initialMethod={method}
          initialUrl={rest?.[0]}
          initialBody={rest?.[1]}
          initialHeaders={initialHeaders}
        />
      </Suspense>
    </PageWrapper>
  );
}
