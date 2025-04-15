'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'use-intl';
import { Spin, Typography } from 'antd';
import { PageWrapper } from '@/components/page-wrapper';
import dynamic from 'next/dynamic';

const VariablesEditor = dynamic(() => import('@/components/variables-editor'), {
  ssr: false,
  loading: () => <Spin></Spin>,
});

const { Title } = Typography;

const VariablesPage = (): ReactNode => {
  const t = useTranslations('Variables');

  return (
    <PageWrapper>
      <Title level={2} style={{ textAlign: 'center' }}>
        {t('title')}
      </Title>
      <VariablesEditor />
    </PageWrapper>
  );
};

export default VariablesPage;
