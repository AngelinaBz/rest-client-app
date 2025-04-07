import { Tabs } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { HeaderType, HttpMethod } from '@/types';
import { useTranslations } from 'next-intl';
import styles from './rest-client-tabs.module.css';
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

  const tabs = getTabs({
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

  const tabItems = tabs.map((tab, index) => ({
    label: tab.label,
    key: index.toString(),
    children: <div className={styles.tab}>{tab.component}</div>,
  }));

  return (
    <Tabs
      defaultActiveKey="headers"
      type="card"
      size="small"
      items={tabItems}
    />
  );
};

export default RestClientTabs;
