'use client';

import { Result, Button } from 'antd';
import { Status } from '@/types';
import { useErrorMeta } from '@/hooks/useErrorMeta';

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  const status = Status[500];
  const meta = useErrorMeta(status);

  return (
    <Result
      status={status}
      title={meta.title}
      subTitle={meta.subTitle}
      extra={
        <Button type="primary" onClick={() => reset()}>
          {meta.buttonText}
        </Button>
      }
    />
  );
}
