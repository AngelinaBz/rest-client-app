import { AppHeader } from '@/components/app-header';
import { render, screen } from '@testing-library/react';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import messages from '@/../messages/en.json';

const locale: Locale = 'en';

const userButtonsText = 'These are user buttons';
vi.mock('@/components/app-header/user-buttons', () => ({
  default: () => <div>{userButtonsText}</div>,
}));

const localeSwitcherText = 'This is a locale switcher';
vi.mock('@/components/locale-switcher', () => ({
  default: () => <div>{localeSwitcherText}</div>,
}));

describe('App Header', () => {
  it('Render logo, locale switcher, user buttons', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppHeader />
      </NextIntlClientProvider>
    );

    const logoLink: HTMLAnchorElement = screen.getByRole('link');
    expect(logoLink.title).toBe(messages.Header.toMain);
    expect(logoLink.href.endsWith(locale)).toBeTruthy();

    const localeSwitcher = screen.getByText(localeSwitcherText);
    expect(localeSwitcher).toBeInTheDocument();

    const userButtons = screen.getByText(userButtonsText);
    expect(userButtons).toBeInTheDocument();
  });
});
