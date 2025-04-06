import dynamic from 'next/dynamic';
import { Tabs } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { HeadersEditor } from '../headers-editor';
import { HeaderType, HttpMethod } from '@/types';
import { useTranslations } from 'next-intl';
import styles from './rest-client-tabs.module.css';

const BodyEditor = dynamic(() => import('../body-editor'), {
  ssr: false,
});
const GeneratedCode = dynamic(() => import('../generated-code'), {
  ssr: false,
});

type Props = {
  headers: HeaderType[];
  addHeader: () => void;
  updateHeader: (index: number, key: string, value: string) => void;
  removeHeader: (index: number) => void;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  url: string;
  method: HttpMethod;
};

const RestClientTabs = ({
  headers,
  addHeader,
  updateHeader,
  removeHeader,
  body,
  setBody,
  url,
  method,
}: Props) => {
  const t = useTranslations('RestfulClient');

  const tabItems = [
    {
      label: t('headers'),
      key: 'headers',
      children: (
        <div className={styles['headers-tab']}>
          <HeadersEditor
            headers={headers}
            addHeader={addHeader}
            updateHeader={updateHeader}
            removeHeader={removeHeader}
          />
        </div>
      ),
    },
    {
      label: t('body'),
      key: 'body',
      children: (
        <div className={styles['body-tab']}>
          <BodyEditor body={body} setBody={setBody} />
        </div>
      ),
    },
    {
      label: t('code'),
      key: 'code',
      children: (
        <div className={styles['code-tab']}>
          <GeneratedCode
            url={url}
            method={method}
            headers={headers}
            body={body}
          />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="headers"
      type="card"
      size="small"
      items={tabItems}
    />
  );
};

export default RestClientTabs;
