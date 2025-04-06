import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from '@/app/[locale]/page';
import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/components/team/team', () => ({
  default: () => <div>Team component</div>,
}));

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Main Page correctly with en locale', () => {
    const message = enMessages;
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
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
    expect(screen.getByText(message.MainPage.button)).toBeInTheDocument();
    expect(screen.getByAltText(message.MainPage.imageAlt)).toBeInTheDocument();
  });

  it('renders Main Page correctly with ru locale', () => {
    const message = ruMessages;
    render(
      <NextIntlClientProvider locale="ru" messages={message}>
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
    expect(screen.getByText(message.MainPage.button)).toBeInTheDocument();
    expect(screen.getByAltText(message.MainPage.imageAlt)).toBeInTheDocument();
  });
});
