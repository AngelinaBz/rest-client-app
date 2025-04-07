'use client';

import styles from './form.module.css';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { FORM, FormType, USER, User } from '@/types/form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getValidationSchema from '@/validation/get-validation-schema';

const { Text } = Typography;

type FormComponentProps = { formType: FormType };

const FormComponent = ({ formType }: FormComponentProps): ReactNode => {
  const t = useTranslations('Form');

  const {
    control,
    formState: { errors, isValid },
  } = useForm<User>({
    mode: 'onChange',
    resolver: yupResolver(getValidationSchema(useTranslations('Validation'))),
  });

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
    <Form
      className={styles.form}
      labelCol={{ span: labelColSpan }}
      wrapperCol={{ span: wrapperColSpan }}
      size={'large'}
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
  );
};

export default FormComponent;
