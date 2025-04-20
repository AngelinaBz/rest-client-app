import ErrorPage from '@/app/error';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import messages from '@/../messages/en.json';
import { Locale, NextIntlClientProvider } from 'next-intl';

const locale: Locale = 'en';

const reset = vi.fn();

describe('Error page', () => {
  it('Render error page with reset button', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ErrorPage reset={reset} />
      </NextIntlClientProvider>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    await waitFor(() => expect(reset).toBeCalled());
  });
});
