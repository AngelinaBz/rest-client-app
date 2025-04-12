'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Typography, Empty, List, Flex, Modal } from 'antd';
import { useTranslations } from 'use-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import {
  ClearOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { formatDate } from '@/utils/format-date';
import Loader from '../loader';
import { ITEMS_PER_PAGE } from '@/utils/constants';

const { Text } = Typography;

const HistoryComponent = () => {
  const t = useTranslations('History');
  const [history, setHistory] = useHistoryLocalStorage();
  const [isAscending, setIsAscending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return isAscending ? timeA - timeB : timeB - timeA;
    });
  }, [history, isAscending]);

  useEffect(() => {
    if (history.length >= 0) {
      setIsLoading(false);
    }
  }, [history]);

  const toggleSortOrder = () => setIsAscending((prev) => !prev);
  const clearHistory = () => setHistory([]);
  const showModal = () => {
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
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex vertical style={{ padding: '10px' }} gap="small">
      {sortedHistory.length > 0 ? (
        <List
          pagination={{
            align: 'center',
            pageSize: ITEMS_PER_PAGE,
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
              <Button onClick={showModal}>
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
                description={formatDate(item.timestamp)}
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
