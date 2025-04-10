import { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { routing } from '@/i18n/routing';
import { RootLayoutProps } from '@/types';
import { AppFooter } from '@/components/app-footer';
import UserProvider from '@/providers/user-provider';
import '@ant-design/v5-patch-for-react-19';
import '../global.css';

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
            <UserProvider>
              <header>Header here</header>
              <main className="main">{children}</main>
              <AppFooter />
            </UserProvider>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
