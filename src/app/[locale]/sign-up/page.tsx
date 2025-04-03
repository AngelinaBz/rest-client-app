'use client';

import { ReactNode } from 'react';
import { FormComponent } from '@/components/form';
import { FormWrapper } from '@/components/form-wrapper';

const SignUpPage = (): ReactNode => {
  return (
    <FormWrapper>
      <FormComponent formType="signUp" />
    </FormWrapper>
  );
};

export default SignUpPage;
