'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'use-intl';
import VariablesEditor from '@/components/variables-editor/variables-editor';
import { Typography } from 'antd';
import { PageWrapper } from '@/components/page-wrapper';

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
