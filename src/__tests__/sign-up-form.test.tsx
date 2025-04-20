import { FormComponent } from '@/components/form';
import { FORM, USER } from '@/types/form';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { Routes } from '@/types/routes';
import messages from '@/../messages/en.json' with { type: 'json' };
import { TEST_ID } from '@/utils/constants';

const locale = 'en';
const validEmail = 'email@domain.com';
const validPassword = '12345Qq!';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ isUser: true, message: '' }),
  })
) as Mock;

vi.mock('@/firebase/auth-action', () => ({
  default: () => ({ isUser: true, message: '' }),
}));

describe('Sign Up Form test', () => {
  beforeEach(() =>
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <FormComponent formType={FORM.signUp} />
      </NextIntlClientProvider>
    )
  );

  it('Action link in Sign Up Form navigates to Sign In Form', () => {
    const actionLink: HTMLAnchorElement = screen.getByRole('link');
    expect(actionLink).toBeInTheDocument();
    expect(
      actionLink.href.includes(`/${locale}${Routes.SIGN_IN}`)
    ).toBeTruthy();
  });

  it('Show success message on account creation', async () => {
    const emailInput: HTMLInputElement = screen.getByRole('textbox');
    expect(emailInput.name).toBe(USER.email);

    const passwordInput = screen.getByTestId(TEST_ID.passwordInput);
    expect(passwordInput).toBeInstanceOf(HTMLInputElement);
    if (passwordInput instanceof HTMLInputElement) {
      expect(passwordInput.type).toBe(USER.password);

      const submitButton: HTMLButtonElement = screen.getByRole('button');
      expect(submitButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: validEmail } });
      fireEvent.change(passwordInput, { target: { value: validPassword } });

      await waitFor(() => expect(submitButton).toBeEnabled());
      fireEvent.click(submitButton);

      await waitFor(() => {
        const successMessage = screen.getByText(
          messages.Form.message.accountCreated
        );
        expect(successMessage).toBeInTheDocument();
      });
    }
  });
});
