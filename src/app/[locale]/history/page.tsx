'use client';

import { ReactNode } from 'react';
import { Button, Typography } from 'antd';
import { useTranslations } from 'use-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';

const { Title } = Typography;

const HistoryPage = (): ReactNode => {
  const t = useTranslations('History');

  return (
    <>
      <Title level={2}>{t('title')}</Title>
      <p>{t('message')}</p>
      <Link href={Routes.RESTFUL_CLIENT('GET')}>
        <Button type="primary">{t('button')}</Button>
      </Link>
    </>
  );
};

export default HistoryPage;
