'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { Card, Flex, Space, Tabs } from 'antd';
import { MethodSelector } from '../method-selector';
import { URLInput } from '../url-input';
import { SubmitButton } from '../submit-button';
import { useTranslations } from 'next-intl';
import { HttpMethod, RequestParams, ResponseData } from '@/types';
import useEditorItems from '@/hooks/use-editor-items';
import { getTabs } from '@/helpers/get-tabs';
import { useNavigateToRequestURL } from '@/hooks/use-navigate-to-request-url';
import { Loader } from '@/components/loader';
import { decodeRouteParams } from '@/utils/decode-route-params';
import useAuth from '@/hooks/use-auth';
import { useRouter } from '@/i18n/navigation';
import { Routes } from '@/types/routes';

const ResponseViewer = dynamic(() => import('../response-viewer'), {
  ssr: false,
  loading: () => <Loader />,
});

type RestfulClientProps = {
  response: ResponseData | null;
  request: RequestParams;
};

const RestfulClient = ({
  response,
  request,
}: RestfulClientProps): React.JSX.Element => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useEditorItems();
  const [body, setBody] = useState('');
  const navigateToRequestURL = useNavigateToRequestURL();
  const { isUser } = useAuth();
  const router = useRouter();

  const t = useTranslations('RestfulClient');
  const tTabs = useTranslations('Tabs');

  useEffect(() => {
    const { method, url, body, headers } = decodeRouteParams();

    if (method) setMethod(method);
    if (url) setUrl(url);
    if (body) setBody(body);
    if (headers)
      setHeaders({
        type: 'addAll',
        payload: Object.entries(headers).map(([key, value]) => ({
          key,
          value,
        })),
      });
  }, []);

  useEffect(() => {
    setMethod(request.method || 'GET');
    const decodedUrl = request.url;
    if (decodedUrl) setUrl(decodedUrl);

    const decodedBody = request.body;
    if (decodedBody && decodedBody.trim() !== '') {
      const formattedBody = (() => {
        try {
          const parsed = JSON.parse(decodedBody);
          return JSON.stringify(parsed, null, 2);
        } catch {
          return decodedBody;
        }
      })();
      setBody(formattedBody);
    }
    setHeaders({
      type: 'addAll',
      payload: request.headers,
    });
  }, [request, setHeaders]);

  const handleSubmit = useCallback(async () => {
    if (!isUser) router.replace(Routes.MAIN);
    if (!url.trim()) return;

    const request = { method, url, headers, body };
    navigateToRequestURL(request);
  }, [method, url, headers, body, navigateToRequestURL]);

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
