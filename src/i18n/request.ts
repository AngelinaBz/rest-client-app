import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

const requestConfig = getRequestConfig(async ({ requestLocale }) => {
  try {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  } catch (error) {
    console.error('Error with app', error);
    return {
      locale: routing.defaultLocale,
      messages: {},
    };
  }
});

export default requestConfig;
