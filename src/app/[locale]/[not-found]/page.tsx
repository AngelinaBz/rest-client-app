'use client';

import { Routes } from '@/types/routes';
import { Result, Button } from 'antd';
import { Status } from '@/types';
import { useErrorMeta } from '@/hooks/useErrorMeta';

const NotFoundPage = () => {
  const status = Status[404];
  const meta = useErrorMeta(status);

  return (
    <Result
      status={status}
      title={meta.title}
      subTitle={meta.subTitle}
      extra={
        <Button type="primary" href={Routes.MAIN}>
          {meta.buttonText}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
