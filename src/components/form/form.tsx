'use client';

import styles from './form.module.css';
import { Button, Flex, Form, Input, message, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useRouter } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { FORM, FormType, USER, User } from '@/types/form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getValidationSchema from '@/validation/get-validation-schema';
import useAuth from '@/hooks/use-auth';
import { MESSAGE_DURATION, TEST_ID } from '@/utils/constants';
import { UserResponse } from '@/types/firebase';

const { Text } = Typography;

type FormComponentProps = { formType: FormType };

const FormComponent = ({ formType }: FormComponentProps): ReactNode => {
  const t = useTranslations('Form');
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { setIsUser } = useAuth();

  const {
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<User>({
    mode: 'onChange',
    resolver: yupResolver(getValidationSchema(useTranslations('Validation'))),
  });

  const onSubmit = async () => {
    const endpoint = formType === FORM.signIn ? '/api/sign-in' : '/api/sign-up';

    try {
      const { isUser, message }: UserResponse = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(watch()),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        return res.json();
      });

      setIsUser(isUser);

      if (isUser) {
        if (formType === FORM.signUp)
          messageApi.success(t('message.accountCreated'), MESSAGE_DURATION);
        router.replace(Routes.MAIN);
      } else messageApi.error(message, MESSAGE_DURATION);
    } catch {
      messageApi.error(t('message.somethingWrong'), MESSAGE_DURATION);
    }
  };

  const wrapperColSpan = 19;
  const labelColSpan = 4;

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: wrapperColSpan,
        offset: labelColSpan,
      },
    },
  };

  return (
    <>
      {contextHolder}
      <Form
        className={styles.form}
        labelCol={{ span: labelColSpan }}
        wrapperCol={{ span: wrapperColSpan }}
        size={'large'}
        onFinish={onSubmit}
      >
        <Controller
          name={USER.email}
          control={control}
          render={({ field }) => (
            <Form.Item label={t('email')} required>
              <Input {...field} />
              <Typography.Paragraph style={{ height: '0rem' }}>
                {errors[USER.email] && (
                  <Text type="danger">{errors[USER.email]?.message}</Text>
                )}
              </Typography.Paragraph>
            </Form.Item>
          )}
        />

        <Controller
          name={USER.password}
          control={control}
          render={({ field }) => (
            <Form.Item label={t('password')} required>
              <Input.Password
                {...field}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined title={t('hidePassword')} />
                  ) : (
                    <EyeInvisibleOutlined title={t('showPassword')} />
                  )
                }
                autoComplete="off"
                data-testid={TEST_ID.passwordInput}
              />
              <Typography.Paragraph style={{ height: '2rem' }}>
                {errors[USER.password] && (
                  <Text type="danger">{errors[USER.password]?.message}</Text>
                )}
              </Typography.Paragraph>
            </Form.Item>
          )}
        />

        <Form.Item {...tailFormItemLayout} label={null}>
          <Button type="primary" htmlType="submit" disabled={!isValid}>
            {t(formType)}
          </Button>
          <Flex style={{ paddingTop: '10px' }} gap="small" wrap="wrap">
            <Typography.Paragraph style={{ margin: '0' }}>
              {t(`accountMessage.${formType}`)}
            </Typography.Paragraph>
            <Link
              href={formType === FORM.signIn ? Routes.SIGN_UP : Routes.SIGN_IN}
            >
              {t(`accountAction.${formType}`)}
            </Link>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormComponent;
