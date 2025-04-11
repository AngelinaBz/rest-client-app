import dynamic from 'next/dynamic';
import { HeadersEditor } from '@/components/headers-editor';
import { EditorItem, HttpMethod } from '@/types';
import { TabsKeys, TabsKeysType } from '@/types/tabs';
import { TabsProps } from 'antd';
import { EditorItemAction } from '@/hooks/use-editor-items';
import { ActionDispatch } from 'react';

const BodyEditor = dynamic(() => import('@/components/body-editor'), {
  ssr: false,
});
const GeneratedCode = dynamic(() => import('@/components/generated-code'), {
  ssr: false,
});

type TabsType = {
  t: (key: TabsKeysType) => string;
  url: string;
  headers: EditorItem[];
  body: string;
  method: HttpMethod;
  setHeaders: ActionDispatch<[action: EditorItemAction]>;
  setBody: (value: string) => void;
};

export const getTabs = ({
  t,
  headers,
  setHeaders,
  body,
  setBody,
  url,
  method,
}: TabsType): TabsProps['items'] => {
  return [
    {
      key: 'headers',
      label: t(TabsKeys.label1),
      children: <HeadersEditor headers={headers} setHeaders={setHeaders} />,
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
