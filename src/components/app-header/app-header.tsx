'use client';

import { useTranslations } from 'next-intl';
import { Button, Layout, Space, Tooltip } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import { Routes } from '@/types/routes';
import styles from './app-header.module.css';

const { Header } = Layout;

const AppHeader = (): React.JSX.Element => {
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations('Header');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <Link className={styles.logo} href={Routes.MAIN}>
        REST Client
      </Link>

      <Space
        className={styles['header-container']}
        size="middle"
        align="center"
      >
        <LocaleSwitcher />

        <Link href={Routes.SIGN_UP}>
          <Tooltip title={t('signin')}>
            <Button
              size="large"
              type="link"
              color="blue"
              variant="outlined"
              icon={<UserOutlined />}
            />
          </Tooltip>
        </Link>

        <Link href={Routes.SIGN_UP}>
          <Tooltip title={t('signup')}>
            <Button size="large" type="primary" icon={<UserAddOutlined />} />
          </Tooltip>
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
