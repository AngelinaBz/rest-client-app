'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography, Flex } from 'antd';
import Team from '../team/team';
import styles from './main-content.module.css';
import { Routes } from '@/types/routes';
import { Link } from '@/i18n/navigation';

const { Title, Paragraph } = Typography;

const MainContent = () => {
  const t = useTranslations('MainPage');

  return (
    <div className={styles['main-container']}>
      <section className={styles['title-section']}>
        <Flex
          vertical
          align="flex-start"
          justify="space-between"
          style={{
            maxWidth: '450px',
          }}
        >
          <Title>{t('title')}</Title>
          <Paragraph>{t('description')}</Paragraph>
          <Link href={Routes.SIGN_IN}>
            <Button type="primary">{t('button')}</Button>
          </Link>
        </Flex>
        <img
          alt={t('imageAlt')}
          src="main.png"
          className={styles['main-img']}
        />
      </section>
      <Flex
        vertical
        justify="flex-start"
        style={{
          width: '100%',
        }}
      >
        <Title level={2}>{t('teamTitle')}</Title>
        <Paragraph>{t('teamDescription')}</Paragraph>
        <Team />
      </Flex>
      <Flex
        vertical
        justify="flex-start"
        style={{
          width: '100%',
        }}
      >
        <Title level={2}>{t('schoolTitle')}</Title>
        <Paragraph>{t('schoolDescription')}</Paragraph>
      </Flex>
    </div>
  );
};

export default MainContent;
