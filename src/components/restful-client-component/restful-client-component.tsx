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
import { HeaderType, HttpMethod, RequestHistoryParams } from '@/types';
import { RestClientTabs } from '../rest-client-tabs';
import { base64UrlDecode } from '@/utils/code64';

const ResponseViewer = dynamic(() => import('../response-viewer'), {
  ssr: false,
});

type RestfulClientProps = {
  initialMethod: HttpMethod;
  initialUrl?: string;
  initialBody?: string;
  initialHeaders?: HeaderType[];
};

const RestfulClient = ({
  initialMethod,
  initialUrl,
  initialBody,
  initialHeaders,
}: RestfulClientProps): React.JSX.Element => {
  const [method, setMethod] = useState<HttpMethod>(initialMethod || 'GET');
  const [url, setUrl] = useState(base64UrlDecode(initialUrl as string));
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders(
    initialHeaders || []
  );
  const [body, setBody] = useState(base64UrlDecode(initialBody as string));
  const { response, sendRequest } = useRequest();
  const [, setHistory] = useHistoryLocalStorage();

  const t = useTranslations('RestfulClient');

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) return;

    const request = { method, url, headers, body };
    const timestamp = new Date().toString();
    const requestHistory: RequestHistoryParams = { ...request, timestamp };
    setHistory((prevHistory = []) => [...prevHistory, requestHistory]);
    await sendRequest(request);
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
