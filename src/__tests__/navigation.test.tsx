import { Locale, NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import messages from '@/../messages/en.json';
import Navigation from '@/components/app-header/navigation';
import { render, screen } from '@testing-library/react';
import { DEFAULT_HTTP_METHOD } from '@/types';
import { Routes } from '@/types/routes';

const locale: Locale = 'en';

vi.mock('@/hooks/use-auth', () => ({
  default: () => ({
    isUser: true,
  }),
}));

describe('Navigation (header)', () => {
  it('Render 3 navigations links when user is authenticated', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );

    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links.length).toBe(3);
    expect(
      links[0].href.includes(Routes.RESTFUL_CLIENT_REQUEST(DEFAULT_HTTP_METHOD))
    ).toBeTruthy();
    expect(links[1].href.includes(Routes.HISTORY)).toBeTruthy();
    expect(links[2].href.includes(Routes.VARIABLES)).toBeTruthy();
  });
});
