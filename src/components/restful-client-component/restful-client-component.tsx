import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Divider, Flex, Space, Typography } from 'antd';
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
    <Space direction="vertical" style={{ width: '96%', margin: '0 auto' }}>
      <Title level={3}>{t('title')}</Title>
      <Flex gap={'small'}>
        <MethodSelector method={method} setMethod={setMethod} />
        <URLInput url={url} setUrl={setUrl} />
      </Flex>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <BodyEditor body={body} setBody={setBody} />
      <SubmitButton onClick={handleSubmit} />
      <Divider />
      <ResponseViewer response={response} />
    </Space>
  );
};

export default RestfulClient;
