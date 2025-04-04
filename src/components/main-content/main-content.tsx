'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography } from 'antd';
import Team from '../team/team';
import styles from './main-content.module.css';
import { Routes } from '@/types/routes';

const { Title, Paragraph } = Typography;

const MainContent = () => {
  const t = useTranslations('MainPage');

  return (
    <div className={styles['main-container']}>
      <section className={styles['main-section']}>
        <div className={styles['title-container']}>
          <Title>Restful Client</Title>
          <Paragraph>{t('description')}</Paragraph>
          <Button type="primary" href={Routes.SIGN_IN} target="_blank">
            {t('button')}
          </Button>
        </div>
        <img alt="rest-img" src="main.png" className={styles['main-img']} />
      </section>
      <Title level={2}>{t('teamTitle')}</Title>
      <Paragraph>{t('teamDescription')}</Paragraph>
      <Team />
      <Title level={2}>{t('schoolTitle')}</Title>
      <Paragraph>{t('schoolDescription')}</Paragraph>
    </div>
  );
};

export default MainContent;
