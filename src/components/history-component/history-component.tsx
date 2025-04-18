'use client';

import { useMemo, useState } from 'react';
import { Button, Empty, List, Flex, Modal } from 'antd';
import { useTranslations } from 'use-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { useHistoryLocalStorage } from '@/hooks/use-history-localstorage';
import {
  ClearOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import HistoryItem from '../history-item';

const HistoryComponent = () => {
  const t = useTranslations('History');
  const [history, setHistory] = useHistoryLocalStorage();
  const [isAscending, setIsAscending] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return isAscending ? timeA - timeB : timeB - timeA;
    });
  }, [history, isAscending]);

  const toggleSortOrder = () => setIsAscending((prev) => !prev);
  const handleOk = () => {
    setHistory([]);
    setIsModalShow(false);
  };

  return (
    <Flex vertical style={{ padding: '10px' }} gap="small">
      <Modal
        open={isModalShow}
        title={t('confirmation.title')}
        okText={t('confirmation.ok')}
        cancelText={t('confirmation.no')}
        onOk={handleOk}
        onCancel={() => setIsModalShow(false)}
      >
        {t('confirmation.description')}
      </Modal>
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
              <Button onClick={() => setIsModalShow(true)}>
                <ClearOutlined />
              </Button>
            </Flex>
          }
          renderItem={(item) => (
            <HistoryItem key={item.timestamp} item={item} />
          )}
        />
      ) : (
        <Empty description={t('message')}>
          <Link href={Routes.RESTFUL_CLIENT_REQUEST('GET')}>
            <Button type="primary">{t('button')}</Button>
          </Link>
        </Empty>
      )}
    </Flex>
  );
};

export default HistoryComponent;
