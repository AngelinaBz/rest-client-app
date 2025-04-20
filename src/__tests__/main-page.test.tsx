import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from '@/app/[locale]/page';
import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';
import { Locale, Messages, NextIntlClientProvider } from 'next-intl';

vi.mock('@/components/team/team', () => ({
  default: () => <div>Team component</div>,
}));

const mainButtonsText = 'These a main page buttons';
vi.mock('@/components/main-content/main-buttons', () => ({
  default: () => <div>{mainButtonsText}</div>,
}));

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const testPageWithLocale = (locale: Locale, message: Messages) => {
    render(
      <NextIntlClientProvider locale={locale} messages={message}>
        <MainPage />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(message.MainPage.title)).toBeInTheDocument();
    expect(
      screen.getByText(message.MainPage.description, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(message.MainPage.teamTitle)).toBeInTheDocument();
    expect(
      screen.getByText(message.MainPage.teamDescription, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(message.MainPage.schoolTitle)).toBeInTheDocument();
    expect(
      screen.getByText(message.MainPage.schoolDescription.slice(0, 50), {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(mainButtonsText)).toBeInTheDocument();
    expect(screen.getByAltText(message.MainPage.imageAlt)).toBeInTheDocument();
  };

  it('renders Main Page correctly with en locale', () => {
    testPageWithLocale('en', enMessages);
  });

  it('renders Main Page correctly with ru locale', () => {
    testPageWithLocale('ru', ruMessages);
  });
});
