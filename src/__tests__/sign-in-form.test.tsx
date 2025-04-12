import { FormComponent } from '@/components/form';
import { FORM } from '@/types/form';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { Routes } from '@/types/routes';
import messages from '@/../messages/en.json' with { type: 'json' };

const locale = 'en';

vi.mock('@/firebase/auth-action', () => ({
  default: vi.fn(),
}));

describe('Sign In Form test', () => {
  beforeEach(() =>
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <FormComponent formType={FORM.signIn} />
      </NextIntlClientProvider>
    )
  );

  it('Action link in Sign In Form navigates to Sign Up Form', () => {
    const actionLink: HTMLAnchorElement = screen.getByRole('link');
    expect(actionLink).toBeInTheDocument();
    expect(
      actionLink.href.includes(`/${locale}${Routes.SIGN_UP}`)
    ).toBeTruthy();
  });

  it('Render password visibility icon correctly', async () => {
    let passwordIcon = screen.getByRole('img');
    expect(passwordIcon.title).toBe(messages.Form.showPassword);

    fireEvent.click(passwordIcon);

    passwordIcon = screen.getByRole('img');
    expect(passwordIcon.title).toBe(messages.Form.hidePassword);
  });
});
