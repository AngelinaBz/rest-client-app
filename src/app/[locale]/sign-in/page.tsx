'use client';

import { ReactNode } from 'react';
import { FormComponent } from '@/components/form';
import { FormWrapper } from '@/components/form-wrapper';

const SignInPage = (): ReactNode => {
  return (
    <FormWrapper>
      <FormComponent formType="signIn" />
    </FormWrapper>
  );
};

export default SignInPage;
