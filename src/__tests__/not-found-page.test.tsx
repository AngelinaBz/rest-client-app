import NotFoundPage from '@/app/[locale]/[not-found]/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import messages from '@/../messages/en.json' with { type: 'json' };
import { Locale, NextIntlClientProvider } from 'next-intl';
import { Routes } from '@/types/routes';

const locale: Locale = 'en';

describe('Not found page', () => {
  it('Render correctly', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NotFoundPage />
      </NextIntlClientProvider>
    );

    const notFoundMessage = screen.getByText(messages.ErrorPage[404].subTitle);
    expect(notFoundMessage).toBeInTheDocument();

    const buttonLink: HTMLAnchorElement = screen.getByRole('link');
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink.textContent).toBe(messages.ErrorPage[404].buttonText);
    expect(buttonLink.href.endsWith(Routes.MAIN)).toBeTruthy();
  });
});
