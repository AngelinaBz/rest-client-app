import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Card, Flex, Space, Tabs } from 'antd';
import { useRequest } from '@/utils/use-request';
import { HttpMethod, RequestParams, RequestHistoryParams } from '@/types';
import { MethodSelector } from '../method-selector';
import { URLInput } from '../url-input';
import { HeadersEditor } from '../headers-editor';
import { SubmitButton } from '../submit-button';
import { useTranslations } from 'next-intl';
import styles from './restful-client-component.module.css';
import { GeneratedCode } from '../generated-code';

const BodyEditor = dynamic(() => import('../body-editor'));
const ResponseViewer = dynamic(() => import('../response-viewer'));

const RestfulClient = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const { response, sendRequest } = useRequest();

  const [history, setHistory] = useState<RequestHistoryParams[]>([]);

  const t = useTranslations('RestfulClient');

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('requests') || '[]');
    setHistory(Array.isArray(savedRequests) ? savedRequests : []);
  }, []);

  const saveRequestToLocalStorage = (request: RequestParams) => {
    const newHistory = [
      ...history,
      { ...request, timestamp: new Date().toISOString() },
    ];
    localStorage.setItem('requests', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const handleSubmit = () => {
    const request = { method, url, headers, body };
    saveRequestToLocalStorage(request);
    sendRequest(request);
  };

  return (
    <Space
      direction="vertical"
      size="small"
      style={{ width: '96%', margin: '0 auto' }}
    >
      <Card title={t('title')} size="small">
        <Flex gap="small">
          <MethodSelector method={method} setMethod={setMethod} />
          <URLInput url={url} setUrl={setUrl} />
          <SubmitButton onClick={handleSubmit} />
        </Flex>
      </Card>

      <Card size="small">
        <Tabs defaultActiveKey="headers" type="card" size="small">
          <Tabs.TabPane tab="Headers" key="headers">
            <div className={styles['headers-tab']}>
              <HeadersEditor headers={headers} setHeaders={setHeaders} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Body" key="body">
            <div className={styles['body-tab']}>
              <BodyEditor body={body} setBody={setBody} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Code" key="code">
            <div className={styles['code-tab']}>
              <GeneratedCode
                url={url}
                method={method}
                headers={headers}
                body={body}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <ResponseViewer response={response} />
    </Space>
  );
};

export default RestfulClient;
