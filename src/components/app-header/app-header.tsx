'use client';

import { Button, Layout, Space } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import { Routes } from '@/types/routes';
import styles from './app-header.module.css';

const { Header } = Layout;

const AppHeader = (): React.JSX.Element => {
  const [isSticky, setIsSticky] = useState(false);

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

      <LocaleSwitcher />

      <Space
        className={styles['header-container']}
        size="middle"
        align="center"
      >
        <Link href="/signin">
          <Button type="link" color="blue" variant="outlined">
            Sign In
          </Button>
        </Link>

        <Link href="/signup">
          <Button type="primary">Sign Up</Button>
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;
