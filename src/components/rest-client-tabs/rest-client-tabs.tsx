import { Tabs } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { HeaderType, HttpMethod } from '@/types';
import { useTranslations } from 'next-intl';
import { getTabs } from '@/helpers/get-tabs';

type Props = {
  headers: HeaderType[];
  addHeader: () => void;
  updateHeader: (index: number, key: string, value: string) => void;
  removeHeader: (index: number) => void;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  url: string;
  method: HttpMethod;
};

const RestClientTabs = ({
  headers,
  addHeader,
  updateHeader,
  removeHeader,
  body,
  setBody,
  url,
  method,
}: Props): React.JSX.Element => {
  const t = useTranslations('Tabs');

  const items = getTabs({
    t,
    headers,
    addHeader,
    updateHeader,
    removeHeader,
    body,
    setBody,
    url,
    method,
  });

  return (
    <Tabs
      defaultActiveKey="headers"
      type="card"
      size="small"
      items={items}
      style={{ height: 240, overflowY: 'auto' }}
    />
  );
};

export default RestClientTabs;
