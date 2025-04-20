import { DEFAULT_HTTP_METHOD } from '@/types';
import { RESTFUL_CLIENT } from '@/types/routes';
import { LOCALES } from '@/utils/constants';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const restfulClientRedirects = LOCALES.map((locale) => {
  const sourceRoute = `/${locale}/${RESTFUL_CLIENT}`;

  return {
    source: sourceRoute,
    destination: `${sourceRoute}/${DEFAULT_HTTP_METHOD}`,
    permanent: true,
  };
});

const nextConfig: NextConfig = {
  async redirects() {
    return restfulClientRedirects;
  },
};

export default withNextIntl(nextConfig);
