'use client';

import { useEffect, useState } from 'react';
import { Button, Typography, Empty, List, Flex, Spin, Modal } from 'antd';
import { useTranslations } from 'use-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import { RequestHistoryParams } from '@/types';
import {
  ClearOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const HistoryComponent = () => {
  const t = useTranslations('History');
  const [history, setHistory] = useHistoryLocalStorage();
  const [sortedHistory, setSortedHistory] = useState<RequestHistoryParams[]>(
    []
  );
  const [isAscending, setIsAscending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!history) {
      setSortedHistory([]);
      setIsLoading(false);
      return;
    }

    const sorted = [...history].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return isAscending ? timeA - timeB : timeB - timeA;
    });

    setSortedHistory(sorted);
    setIsLoading(false);
  }, [history, isAscending]);

  const toggleSortOrder = () => setIsAscending((prev) => !prev);
  const clearHistory = () => setHistory([]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center">
        <Spin size="large" />
      </Flex>
    );
  }

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
                {isAscending ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )}
              </Button>
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: t('confirmation.title'),
                    content: t('confirmation.description'),
                    okText: t('confirmation.ok'),
                    cancelText: t('confirmation.no'),
                    onOk: clearHistory,
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}
              >
                <ClearOutlined />
              </Button>
            </Flex>
          }
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <Text style={{ cursor: 'pointer' }}>
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

export default HistoryComponent;
