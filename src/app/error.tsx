'use client';

import { Result, Button } from 'antd';
import { ERROR_MAP, Status } from '@/types';

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  const status = Status[500];
  const meta = ERROR_MAP[status];

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
