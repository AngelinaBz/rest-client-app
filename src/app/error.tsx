'use client';

import { ERROR_MAP, Status } from '@/types';
import { Result, Button } from 'antd';
import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const status = Status[500];
  const meta = ERROR_MAP[status];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Result
      status={status}
      title={meta.title}
      subTitle={meta.subTitle}
      extra={
        <Button type="primary" onClick={() => reset()}>
          Try Again
        </Button>
      }
    />
  );
}
