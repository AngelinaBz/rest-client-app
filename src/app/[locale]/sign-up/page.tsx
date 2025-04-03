'use client';

import { ReactNode } from 'react';
import { FormComponent } from '@/components/form';
import { FormWrapper } from '@/components/form-wrapper';
import { Typography } from 'antd';
import { useTranslations } from 'use-intl';

const { Title } = Typography;

const SignUpPage = (): ReactNode => {
  const t = useTranslations('Form');

  return (
    <>
      <Title level={2}>{t('signUp')}</Title>
      <FormWrapper>
        <FormComponent formType="signUp" />
      </FormWrapper>
    </>
  );
};

export default SignUpPage;
