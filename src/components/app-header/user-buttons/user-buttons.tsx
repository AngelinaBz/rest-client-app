'use client';

import useAuth from '@/hooks/use-auth';
import { Link, useRouter } from '@/i18n/navigation';
import { UserResponse } from '@/types/firebase';
import { Routes } from '@/types/routes';
import { MESSAGE_DURATION } from '@/utils/constants';
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Flex, message, Spin, Tooltip } from 'antd';
import { ReactNode } from 'react';
import { useTranslations } from 'use-intl';

const UserButtons = (): ReactNode => {
  const { isUser, setIsUser } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const t = useTranslations('Header');
  const tMessages = useTranslations('Form.message');
  const router = useRouter();

  const signOutUser = async () => {
    try {
      const { isUser: isUserNew }: UserResponse = await fetch('/api/sign-out', {
        method: 'POST',
      }).then((res) => res.json());

      if (isUser !== isUserNew) {
        setIsUser(isUserNew);
        router.replace(Routes.MAIN);
      }
    } catch {
      messageApi.error(tMessages('somethingWrong'), MESSAGE_DURATION);
    }
  };

  return (
    <>
      {contextHolder}
      <Flex align="center" justify="end" style={{ width: '100px' }} gap="1rem">
        {isUser === null && <Spin></Spin>}

        {isUser && (
          <Tooltip title={t('signOut')}>
            <Button
              size="large"
              icon={<LogoutOutlined />}
              onClick={signOutUser}
            />
          </Tooltip>
        )}

        {!isUser && isUser !== null && (
          <>
            <Link href={Routes.SIGN_IN}>
              <Tooltip title={t('signIn')}>
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  icon={<LoginOutlined />}
                />
              </Tooltip>
            </Link>
            <Link href={Routes.SIGN_UP}>
              <Tooltip title={t('signUp')}>
                <Button
                  size="large"
                  type="primary"
                  icon={<UserAddOutlined />}
                />
              </Tooltip>
            </Link>
          </>
        )}
      </Flex>
    </>
  );
};

export default UserButtons;
