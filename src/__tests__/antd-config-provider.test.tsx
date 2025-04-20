import AntdConfigProvider from '@/providers/antd-config-provider';
import { render, screen } from '@testing-library/react';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import messages from '@/../messages/en.json';

const locale: Locale = 'en';

const text = 'Some text';
const TestComponent = () => <p>{text}</p>;

describe('Antd config provider', () => {
  it('Render children component', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AntdConfigProvider>
          <TestComponent />
        </AntdConfigProvider>
      </NextIntlClientProvider>
    );

    const paragraph = screen.getByText(text);
    expect(paragraph).toBeInTheDocument();
  });
});
