import LocaleSwitcher from '@/components/locale-switcher';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { LOCALES } from '@/utils/constants';
import messages from '@/../messages/en.json' with { type: 'json' };

const locale: Locale = 'en';

describe('Locale switcher', () => {
  it('Render locale switcher correctly', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    const switcher = screen.getByRole('combobox');
    expect(switcher).toBeInTheDocument();

    fireEvent.mouseDown(switcher);
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBe(LOCALES.length);
      expect(
        options.every(
          (option) => option.textContent && LOCALES.includes(option.textContent)
        )
      ).toBeTruthy();
    });
  });
});
