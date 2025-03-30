import { Routes } from '@/types/routes';
import { Result, Button } from 'antd';
import Link from 'next/link';
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
        <Link href={Routes.MAIN} passHref>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
