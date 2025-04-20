import React from 'react';
import { Card, Descriptions, Tabs, Tag } from 'antd';
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

  const { status, body, headers } = response;

  let parsedBody: unknown = body;
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    if (error instanceof Error) {
      parsedBody = error.message;
    }
  }

  return (
    <Card
      title={
        <>
          {t('response')}
          <Tag
            color={
              status === 0
                ? 'gray'
                : status < 400
                  ? 'green'
                  : status < 500
                    ? 'orange'
                    : 'red'
            }
            style={{ marginLeft: '1rem', fontSize: '14px' }}
          >
            {t('status')}: {status}
          </Tag>
        </>
      }
      style={{ width: '100%', overflowY: 'auto', overflowX: 'hidden' }}
    >
      <Tabs
        defaultActiveKey="body"
        items={[
          {
            key: 'body',
            label: t('body'),
            children: (
              <pre className={styles['response-pre']}>
                {typeof parsedBody === 'string'
                  ? parsedBody
                  : JSON.stringify(parsedBody, null, 2)}
              </pre>
            ),
          },
          {
            key: 'headers',
            label: t('headers'),
            children:
              headers.length > 0 ? (
                <Descriptions column={1}>
                  {headers.map(({ key, value }) => (
                    <Descriptions.Item key={key} label={key}>
                      {value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              ) : (
                <p>{t('noHeaders')}</p>
              ),
          },
        ]}
      ></Tabs>
    </Card>
  );
};

export default ResponseViewer;
