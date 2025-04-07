import React from 'react';
import { Card } from 'antd';
import { ResponseData } from '@/types';
import { useTranslations } from 'use-intl';
import styles from './response-viewer.module.css';

const ResponseViewer = ({
  response,
}: {
  response: ResponseData | null;
}): React.JSX.Element => {
  const t = useTranslations('RestfulClient');

  if (!response) return <Card title={t('response')}>{t('noResponseYet')}</Card>;

  let parsedBody: unknown = response.body;
  try {
    parsedBody = JSON.parse(response.body);
  } catch (error) {
    if (error instanceof Error) {
      parsedBody = error.message;
    }
  }

  return (
    <Card title={t('response')} style={{ width: '100%', overflow: 'auto' }}>
      <pre className={styles['response-pre']}>
        {JSON.stringify({ ...response, body: parsedBody }, null, 2)}
      </pre>
    </Card>
  );
};

export default React.memo(ResponseViewer);
