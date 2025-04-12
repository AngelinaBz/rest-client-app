import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { Card, Flex, Space, Tabs } from 'antd';
import { useRequest } from '@/hooks/use-request';
import { MethodSelector } from '../method-selector';
import { URLInput } from '../url-input';
import { SubmitButton } from '../submit-button';
import { useTranslations } from 'next-intl';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import { HttpMethod, RequestHistoryParams } from '@/types';
import useEditorItems from '@/hooks/use-editor-items';
import { getTabs } from '@/helpers/get-tabs';

const ResponseViewer = dynamic(() => import('../response-viewer'), {
  ssr: false,
});

const RestfulClient = (): React.JSX.Element => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useEditorItems();
  const [body, setBody] = useState('');
  const { response, sendRequest } = useRequest();
  const [, setHistory] = useHistoryLocalStorage();

  const t = useTranslations('RestfulClient');
  const tTabs = useTranslations('Tabs');

  const handleSubmit = useCallback(() => {
    if (!url.trim()) return;

    const request = { method, url, headers, body };
    const timestamp = new Date().toString();
    const requestHistory: RequestHistoryParams = { ...request, timestamp };
    setHistory((prevHistory = []) => [...prevHistory, requestHistory]);
    sendRequest(request);
  }, [method, url, headers, body, sendRequest, setHistory]);

  const items = getTabs({
    t: tTabs,
    headers,
    setHeaders,
    body,
    setBody,
    url,
    method,
  });

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
        <Tabs
          defaultActiveKey="headers"
          type="card"
          size="small"
          items={items}
          style={{ height: 240, overflowY: 'auto' }}
        />
      </Card>

      <ResponseViewer response={response} />
    </Space>
  );
};

export default RestfulClient;
