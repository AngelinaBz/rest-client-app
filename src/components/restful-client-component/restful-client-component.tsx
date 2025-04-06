import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { Card, Flex, Space } from 'antd';
import { useRequest } from '@/utils/use-request';
import { HttpMethod } from '@/types';
import { MethodSelector } from '../method-selector';
import { URLInput } from '../url-input';
import { SubmitButton } from '../submit-button';
import { useTranslations } from 'next-intl';
import { useLocalStorage } from '@/utils/use-localstorage';
import { useHistoryLocalstorage } from '@/utils/use-history-localstorage';
import { useHeaders } from '@/utils/useHeaders';
import { RestClientTabs } from '../rest-client-tabs.tsx';

const ResponseViewer = dynamic(() => import('../response-viewer'), {
  ssr: false,
});

const RestfulClient = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders();
  const [body, setBody] = useState('');
  const { response, sendRequest } = useRequest();
  const [, setRequests] = useLocalStorage();
  const [, setHistory] = useHistoryLocalstorage();

  const t = useTranslations('RestfulClient');

  const handleSubmit = useCallback(() => {
    if (url.trim()) {
      console.log(url);
      const request = { method, url, headers, body };
      setRequests(request);
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory, request];
        return newHistory.slice(-10);
      });
      sendRequest(request);
    }
  }, [method, url, headers, body, sendRequest, setRequests, setHistory]);

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
        <RestClientTabs
          headers={headers}
          addHeader={addHeader}
          updateHeader={updateHeader}
          removeHeader={removeHeader}
          body={body}
          setBody={setBody}
          url={url}
          method={method}
        />
      </Card>

      <ResponseViewer response={response} />
    </Space>
  );
};

export default RestfulClient;
