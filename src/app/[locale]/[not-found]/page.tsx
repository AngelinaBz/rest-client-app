'use client';

import { Routes } from '@/types/routes';
import { Result, Button } from 'antd';
import { ERROR_MAP, Status } from '@/types';

const NotFoundPage = () => {
  const status = Status[404];
  const meta = ERROR_MAP[status];

  return (
    <Result
      status={status}
      title={meta.title}
      subTitle={meta.subTitle}
      extra={
        <Button type="primary" href={Routes.MAIN}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
