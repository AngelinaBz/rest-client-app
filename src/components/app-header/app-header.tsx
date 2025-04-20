'use client';

import { Layout, Space } from 'antd';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import LocaleSwitcher from '../locale-switcher';
import { Routes } from '@/types/routes';
import UserButtons from './user-buttons';
import styles from './app-header.module.css';
import Navigation from './navigation';
import Image from 'next/image';
import logo from '@/../public/icon.png';

const { Header } = Layout;

const AppHeader = (): React.JSX.Element => {
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations('Header');

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
      <Link
        className={styles.logo}
        href={Routes.MAIN}
        title={t('toMain')}
        type="outlined"
      >
        <Image
          src={logo}
          alt={t('client')}
          width={50}
          height={45}
          className={styles['logo-img']}
        ></Image>
      </Link>

      <Navigation />

      <Space size="large" align="center" style={{ width: '200px' }}>
        <LocaleSwitcher />
        <UserButtons />
      </Space>
    </Header>
  );
};

export default AppHeader;
