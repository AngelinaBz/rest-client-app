import { render, screen } from '@testing-library/react';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import messages from '@/../messages/en.json' with { type: 'json' };
import MainButtons from '@/components/main-content/main-buttons';
import { RESTFUL_CLIENT, Routes } from '@/types/routes';

const locale: Locale = 'en';

const isUser1: boolean = false;
const isUser2: boolean = true;

const getIsUser = vi
  .fn()
  .mockImplementationOnce(() => isUser1)
  .mockImplementationOnce(() => isUser2);

vi.mock('@/hooks/use-auth', () => ({
  default: () => ({
    isUser: getIsUser(),
    setIsUser: vi.fn(),
  }),
}));

describe('Main buttons (main page)', () => {
  it('(1) Show Start button for an unauthenticated user', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <MainButtons />
      </NextIntlClientProvider>
    );

    const buttonLinks: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(buttonLinks.length).toBe(1);
    expect(buttonLinks[0].href.includes(Routes.SIGN_IN)).toBeTruthy();
  });

  it('(2) Show RESTful Client, History and Variables buttons for an authenticated user', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <MainButtons />
      </NextIntlClientProvider>
    );

    const buttonLinks: HTMLLinkElement[] = screen.getAllByRole('link');
    expect(buttonLinks.length).toBe(3);
    expect(buttonLinks[0].href.includes(RESTFUL_CLIENT)).toBeTruthy();
    expect(buttonLinks[1].href.includes(Routes.HISTORY)).toBeTruthy();
    expect(buttonLinks[2].href.includes(Routes.VARIABLES)).toBeTruthy();
  });
});
