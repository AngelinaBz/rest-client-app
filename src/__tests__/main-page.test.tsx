import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from '@/app/[locale]/page';
import enMessages from '../../messages/en.json';
import ruMessages from '../../messages/ru.json';
import { __setLocale } from '@/__tests__/__mocks__/next-intl';

vi.mock('@/components/team/team', () => ({
  default: () => <div>Team component</div>,
}));

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Main Page correctly with en locale', () => {
    __setLocale('en');
    const message = enMessages;
    render(<MainPage />);

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
    __setLocale('ru');
    const message = ruMessages;
    render(<MainPage />);

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
