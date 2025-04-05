import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Card, Flex, Space, Tabs, Typography } from 'antd';
import { useRequest } from '@/utils/use-request';
import { HttpMethod, RequestParams, RequestHistoryParams } from '@/types';
import { MethodSelector } from '../method-selector';
import { URLInput } from '../url-input';
import { HeadersEditor } from '../headers-editor';
import { SubmitButton } from '../submit-button';
import { useTranslations } from 'next-intl';

const { Title } = Typography;

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
      <Title level={4}>{t('title')}</Title>
      <Flex gap={'small'}>
        <MethodSelector method={method} setMethod={setMethod} />
        <URLInput url={url} setUrl={setUrl} />
        <SubmitButton onClick={handleSubmit} />
      </Flex>

      <Card size="small">
        <Tabs defaultActiveKey="headers" type="card" size="small">
          <Tabs.TabPane tab="Headers" key="headers">
            <div style={{ height: 200, overflowY: 'auto' }}>
              <HeadersEditor headers={headers} setHeaders={setHeaders} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Body" key="body">
            <div style={{ height: 200, overflowY: 'auto' }}>
              <BodyEditor body={body} setBody={setBody} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <ResponseViewer response={response} />
    </Space>
  );
};

export default RestfulClient;
