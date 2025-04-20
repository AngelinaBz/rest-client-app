'use client';

import dynamic from 'next/dynamic';
import { Spin, Typography } from 'antd';
import { useTranslations } from 'use-intl';
import { PageWrapper } from '@/components/page-wrapper';

const HistoryComponent = dynamic(
  () => import('@/components/history-component'),
  {
    ssr: false,
    loading: () => <Spin></Spin>,
  }
);

const { Title } = Typography;

const HistoryPage = () => {
  const t = useTranslations('History');

  return (
    <PageWrapper>
      <Title level={2} style={{ textAlign: 'center' }}>
        {t('title')}
      </Title>
      <HistoryComponent />
    </PageWrapper>
  );
};

export default HistoryPage;
