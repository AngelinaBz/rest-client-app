'use client';

import styles from './form.module.css';
import { Button, Flex, Form, Input, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import { FORM, FormType } from '@/types/form';

type FormComponentProps = { formType: FormType };

const FormComponent = ({ formType }: FormComponentProps): ReactNode => {
  const t = useTranslations('Form');

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
      <Form.Item label={t('email')} name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label={t('password')}
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined title={t('hidePassword')} />
            ) : (
              <EyeInvisibleOutlined title={t('showPassword')} />
            )
          }
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout} label={null}>
        <Button type="primary" htmlType="submit">
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
