'use client';

import { Button, Layout, Space, Tooltip } from 'antd';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import { Routes } from '@/types/routes';
import styles from './app-header.module.css';

const { Header } = Layout;

const AppHeader = (): React.JSX.Element => {
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations('Form');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Header
      className={`${styles.header} ${isSticky ? styles.sticky : ''}`}
      style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <Link className={styles.logo} href={Routes.MAIN}>
        REST Client
      </Link>

      <Space className={styles['icon-container']} size="middle" align="center">
        <LocaleSwitcher />

        <Link href={Routes.SIGN_IN}>
          <Tooltip title={t('signIn')}>
            <Button
              size="large"
              type="link"
              color="blue"
              variant="outlined"
              icon={<LoginOutlined />}
            />
          </Tooltip>
        </Link>

        <Link href={Routes.SIGN_UP}>
          <Tooltip title={t('signUp')}>
            <Button size="large" type="primary" icon={<UserAddOutlined />} />
          </Tooltip>
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
