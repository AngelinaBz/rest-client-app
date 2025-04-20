'use client';

import useAuth from '@/hooks/use-auth';
import { Link, usePathname } from '@/i18n/navigation';
import { DEFAULT_HTTP_METHOD } from '@/types';
import { Routes } from '@/types/routes';
import { useTranslations } from 'next-intl';
import styles from './navigation.module.css';

const Navigation = () => {
  const t = useTranslations();
  const { isUser } = useAuth();
  const pathname = usePathname();

  const items = [
    {
      label: t('MainPage.button.client'),
      key: 'restClient',
      href: Routes.RESTFUL_CLIENT_REQUEST(DEFAULT_HTTP_METHOD),
    },
    {
      label: t('MainPage.button.history'),
      key: 'history',
      href: Routes.HISTORY,
    },
    {
      label: t('MainPage.button.variables'),
      key: 'variables',
      href: Routes.VARIABLES,
    },
  ];

  return (
    <>
      {isUser ? (
        <nav className={styles.nav}>
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.key}
              className={`${styles.link} ${item.href === pathname ? styles['link-active'] : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </>
  );
};

export default Navigation;
