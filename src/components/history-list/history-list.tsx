'use client';

import { useEffect, useState } from 'react';
import { Button, Typography, Empty, List, Flex } from 'antd';
import { useTranslations } from 'use-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import { RequestHistoryParams } from '@/types';

const { Text } = Typography;

const HistoryList = () => {
  const t = useTranslations('History');
  const [history] = useHistoryLocalStorage();
  const [sortedHistory, setSortedHistory] = useState<RequestHistoryParams[]>(
    []
  );

  useEffect(() => {
    if (!history) return;

    const sorted = [...history].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    setSortedHistory(sorted);
  }, [history]);

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
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <>
                    <Text>
                      {item.method} {item.url}
                    </Text>
                  </>
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
