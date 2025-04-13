'use client';

import { Typography } from 'antd';
import { useTranslations } from 'use-intl';
import { PageWrapper } from '@/components/page-wrapper';
import HistoryComponent from '@/components/history-component';

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
