import { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { routing } from '@/i18n/routing';
import { Params, RootLayoutProps } from '@/types';
import { AppFooter } from '@/components/app-footer';
import AntdConfigProvider from '@/providers/antd-config-provider';
import UserProvider from '@/providers/user-provider';
import '@ant-design/v5-patch-for-react-19';
import '../global.css';
import { AppHeader } from '@/components/app-header';
import NotFoundPage from './[not-found]/page';
import { DEFAULT_LOCALE } from '@/utils/constants';
import { getTranslations } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

type MetadataProps = { params: Promise<Params> };

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const { locale } = await params;
  const correctLocale = hasLocale(routing.locales, locale)
    ? locale
    : DEFAULT_LOCALE;
  const t = await getTranslations({
    locale: correctLocale,
    namespace: 'Metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: 'icon.png',
    },
  };
};

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const { locale } = await params;

  const isCorrectLocale = hasLocale(routing.locales, locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AntdRegistry>
          <AntdConfigProvider>
            <NextIntlClientProvider>
              <UserProvider>
                <AppHeader />
                {isCorrectLocale ? (
                  <main className="main">{children}</main>
                ) : (
                  <NotFoundPage />
                )}

                <AppFooter />
              </UserProvider>
            </NextIntlClientProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
