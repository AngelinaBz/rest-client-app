import { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { routing } from '@/i18n/routing';
import { RootLayoutProps } from '@/types';
import { AppFooter } from '@/components/app-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REST Client App',
  description: 'A modern RESTful API client',
  icons: {
    icon: 'icon.png',
  },
};

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AntdRegistry>
          <NextIntlClientProvider>
            <header>Header here</header>
            <main>{children}</main>
            <AppFooter />
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
