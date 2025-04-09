import dynamic from 'next/dynamic';
import { HeadersEditor } from '@/components/headers-editor';
import { HeaderType, HttpMethod } from '@/types';
import { TabsKeys, TabsKeysType } from '@/types/tabs';
import { TabsProps } from 'antd';

const BodyEditor = dynamic(() => import('@/components/body-editor'), {
  ssr: false,
});
const GeneratedCode = dynamic(() => import('@/components/generated-code'), {
  ssr: false,
});

type TabsType = {
  t: (key: TabsKeysType) => string;
  url: string;
  headers: HeaderType[];
  body: string;
  method: HttpMethod;
  addHeader: () => void;
  updateHeader: (index: number, key: string, value: string) => void;
  removeHeader: (index: number) => void;
  setBody: (value: string) => void;
};

export const getTabs = ({
  t,
  headers,
  addHeader,
  updateHeader,
  removeHeader,
  body,
  setBody,
  url,
  method,
}: TabsType): TabsProps['items'] => {
  return [
    {
      key: 'headers',
      label: t(TabsKeys.label1),
      children: (
        <HeadersEditor
          headers={headers}
          addHeader={addHeader}
          updateHeader={updateHeader}
          removeHeader={removeHeader}
        />
      ),
    },
    {
      key: 'body',
      label: t(TabsKeys.label2),
      children: <BodyEditor body={body} setBody={setBody} />,
    },
    {
      key: 'code',
      label: t(TabsKeys.label3),
      children: (
        <GeneratedCode
          method={method}
          url={url}
          headers={headers}
          body={body}
        />
      ),
    },
  ];
};
