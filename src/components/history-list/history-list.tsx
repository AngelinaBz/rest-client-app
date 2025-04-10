'use client';

import { useEffect, useState } from 'react';
import { Button, Typography, Empty, List, Flex } from 'antd';
import { useTranslations } from 'use-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import { RequestHistoryParams } from '@/types';
import { ClearOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text } = Typography;

const HistoryList = () => {
  const t = useTranslations('History');
  const [history, setHistory] = useHistoryLocalStorage();
  const [sortedHistory, setSortedHistory] = useState<RequestHistoryParams[]>(
    []
  );
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    if (!history) return;

    const sorted = [...history].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return isAscending ? timeA - timeB : timeB - timeA;
    });

    setSortedHistory(sorted);
  }, [history, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Flex vertical style={{ padding: '10px' }} gap="small">
      {sortedHistory.length > 0 ? (
        <List
          pagination={{
            align: 'center',
            pageSize: 10,
          }}
          dataSource={sortedHistory}
          bordered
          header={
            <Flex gap="small">
              <Button onClick={toggleSortOrder}>
                {isAscending ? <DownOutlined /> : <UpOutlined />}
              </Button>
              <Button onClick={clearHistory}>
                <ClearOutlined />
              </Button>
            </Flex>
          }
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <Text>
                    {item.method} {item.url}
                  </Text>
                }
                description={new Date(item.timestamp).toLocaleString()}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description={t('message')}>
          <Link href={Routes.RESTFUL_CLIENT('GET')}>
            <Button type="primary">{t('button')}</Button>
          </Link>
        </Empty>
      )}
    </Flex>
  );
};

export default HistoryList;
