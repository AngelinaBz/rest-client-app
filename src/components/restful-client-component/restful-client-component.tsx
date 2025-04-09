import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { Card, Flex, Space } from 'antd';
import { useRequest } from '@/hooks/use-request';
import { MethodSelector } from '../method-selector';
import { URLInput } from '../url-input';
import { SubmitButton } from '../submit-button';
import { useTranslations } from 'next-intl';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import { useHeaders } from '@/hooks/use-headers';
import { HttpMethod, RequestHistoryParams } from '@/types';
import { RestClientTabs } from '../rest-client-tabs';

const ResponseViewer = dynamic(() => import('../response-viewer'), {
  ssr: false,
});

const RestfulClient = (): React.JSX.Element => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders();
  const [body, setBody] = useState('');
  const { response, sendRequest } = useRequest();
  const [, setHistory] = useHistoryLocalStorage();

  const t = useTranslations('RestfulClient');

  const handleSubmit = useCallback(() => {
    if (!url.trim()) return;

    const request = { method, url, headers, body };
    const timestamp = new Date().toString();
    const requestHistory: RequestHistoryParams = { ...request, timestamp };
    setHistory((prevHistory = []) => [...prevHistory, requestHistory]);
    sendRequest(request);
  }, [method, url, headers, body, sendRequest, setHistory]);

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
