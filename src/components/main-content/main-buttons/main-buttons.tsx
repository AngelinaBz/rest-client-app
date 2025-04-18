'use client';

import useAuth from '@/hooks/use-auth';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { Button, Flex, Spin } from 'antd';
import { useTranslations } from 'next-intl';

const MainButtons = () => {
  const { isUser } = useAuth();
  const t = useTranslations('MainPage');

  return (
    <Flex gap="middle">
      {isUser === null && <Spin></Spin>}
      {!isUser && isUser !== null && (
        <Link href={Routes.SIGN_IN}>
          <Button type="primary">{t('button.start')}</Button>
        </Link>
      )}
      {isUser && (
        <>
          <Link href={Routes.RESTFUL_CLIENT_REQUEST('GET', '')}>
            <Button type="primary">{t('button.client')}</Button>
          </Link>
          <Link href={Routes.HISTORY}>
            <Button variant="outlined" color="primary">
              {t('button.history')}
            </Button>
          </Link>
          <Link href={Routes.VARIABLES}>
            <Button variant="outlined" color="primary">
              {t('button.variables')}
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default MainButtons;
