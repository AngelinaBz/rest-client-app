import UserButtons from '@/components/app-header/user-buttons';
import { describe, expect, it, Mock, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { Routes } from '@/types/routes';
import { ChildrenProps } from '@/types';
import messages from '@/../messages/en.json' with { type: 'json' };

const locale: Locale = 'en';

const isUser1: boolean = false;
const isUser2: boolean = true;

const getIsUser = vi
  .fn()
  .mockImplementationOnce(() => isUser1)
  .mockImplementationOnce(() => isUser2);

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ isUser: !isUser2, message: '' }),
  })
) as Mock;

vi.mock('@/hooks/use-auth', () => ({
  default: () => ({
    isUser: getIsUser(),
    setIsUser: vi.fn(),
  }),
}));

const replace = vi.fn();

vi.mock('@/i18n/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useRouter: () => ({ replace: replace }),
  };
});

vi.mock('@/components/button-with-auth', () => {
  return { default: ({ children }: ChildrenProps) => <>{children}</> };
});

describe('User Buttons (header)', () => {
  it('(1) Show Sign in and Sign up buttons for an unauthenticated user', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <UserButtons />
      </NextIntlClientProvider>
    );

    const buttonLinks: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(buttonLinks.length).toBe(2);
    expect(buttonLinks[0].href.includes(Routes.SIGN_IN));
    expect(buttonLinks[1].href.includes(Routes.SIGN_UP));
  });

  it('(2) Show Sign out button for an authenticated user; Sign out button redirects to the main page', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <UserButtons />
      </NextIntlClientProvider>
    );

    const signOutButton: HTMLButtonElement = screen.getByRole('button');
    fireEvent.click(signOutButton);
    await waitFor(() => expect(replace).toBeCalledWith(Routes.MAIN));
  });
});
