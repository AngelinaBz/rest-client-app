'use client';

import { Typography, List } from 'antd';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { formatDate } from '@/utils/format-date';
import { RequestHistoryParams } from '@/types';
import { base64UrlEncode } from '@/utils/code64';
import styles from './history-item.module.css';

type HistoryItemProps = {
  item: RequestHistoryParams;
};

const { Text } = Typography;

const HistoryItem = ({ item }: HistoryItemProps) => {
  const encodedUrl = base64UrlEncode(item.url);
  const encodedBody = base64UrlEncode(item.body);
  const headers = item.headers.reduce(
    (acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  const path = Routes.RESTFUL_CLIENT_REQUEST(
    item.method,
    encodedUrl,
    encodedBody,
    headers
  );

  return (
    <List.Item>
      <List.Item.Meta
        title={
          <Link href={path}>
            <Text className={styles.link}>
              {item.method} {item.url}
            </Text>
          </Link>
        }
        description={formatDate(item.timestamp)}
      />
    </List.Item>
  );
};

export default HistoryItem;
