import dynamic from 'next/dynamic';
import { HeadersEditor } from '@/components/headers-editor';
import { HeaderType, HttpMethod } from '@/types';
import { TabsKeys, TabsKeysType } from '@/types/tabs';

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
}: TabsType) => {
  return [
    {
      label: t(TabsKeys.label1),
      component: (
        <HeadersEditor
          headers={headers}
          addHeader={addHeader}
          updateHeader={updateHeader}
          removeHeader={removeHeader}
        />
      ),
    },
    {
      label: t(TabsKeys.label2),
      component: <BodyEditor body={body} setBody={setBody} />,
    },
    {
      label: t(TabsKeys.label3),
      component: (
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
