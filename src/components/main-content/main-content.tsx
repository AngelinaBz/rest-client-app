'use client';

import { useTranslations } from 'next-intl';
import { Typography } from 'antd';
import Team from '../team/team';
import styles from './main-content.module.css';

const { Title, Paragraph } = Typography;

const MainContent = () => {
  const t = useTranslations('MainPage');

  return (
    <div className={styles.main}>
      <Title>Restful Client</Title>
      <Paragraph>{t('description')}</Paragraph>
      <Title level={2}>{t('teamTitle')}</Title>
      <Paragraph>{t('teamDescription')}</Paragraph>
      <Team />
      <Title level={2}>{t('schoolTitle')}</Title>
      <Paragraph>{t('schoolDescription')}</Paragraph>
    </div>
  );
};

export default MainContent;
