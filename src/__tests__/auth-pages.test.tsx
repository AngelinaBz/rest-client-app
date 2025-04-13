import SignInPage from '@/app/[locale]/sign-in/page';
import SignUpPage from '@/app/[locale]/sign-up/page';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { FORM, FormType } from '@/types/form';
import messages from '@/../messages/en.json';

const formMessages = messages.Form;

vi.mock('use-intl', () => {
  return {
    useTranslations: () => (message: keyof typeof formMessages) => {
      return formMessages[message];
    },
  };
});

const signInFormText = 'Sign In Form';
const signUpFormText = 'Sign Up Form';

vi.mock('@/components/form-wrapper', () => ({
  FormWrapper: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/form', () => ({
  FormComponent: vi
    .fn()
    .mockImplementationOnce(() => <div>{signInFormText}</div>)
    .mockImplementationOnce(() => <div>{signUpFormText}</div>),
}));

describe('Auth Pages', () => {
  const test = (
    testName: string,
    Page: () => ReactNode,
    formType: FormType,
    formText: string
  ) => {
    it(testName, () => {
      render(<Page />);

      const title = screen.getByText(formMessages[formType]);
      expect(title).toBeInstanceOf(HTMLHeadingElement);

      const form = screen.getByText(formText);
      expect(form).toBeInTheDocument();
    });
  };

  test(
    'Render Sign In page correctly',
    SignInPage,
    FORM.signIn,
    signInFormText
  );

  test(
    'Render Sign Up page correctly',
    SignUpPage,
    FORM.signUp,
    signUpFormText
  );
});
