import enMessages from '../../../messages/en.json';
import ruMessages from '../../../messages/ru.json';

type Messages = { [key: string]: string | Messages };
let currentLocale = 'en';

export const __setLocale = (locale: 'en' | 'ru') => {
  currentLocale = locale;
};

export const useTranslations = (namespace: string) => (key: string) => {
  const messages: Record<string, Messages> = {
    en: enMessages,
    ru: ruMessages,
  };

  const getNested = (obj: Messages, path: string): string | undefined => {
    return path
      .split('.')
      .reduce<Messages | string | undefined>((acc, part) => {
        if (typeof acc === 'object' && acc !== null && part in acc) {
          return (acc as Messages)[part];
        }
        return undefined;
      }, obj) as string | undefined;
  };

  return (
    getNested(messages[currentLocale] as Messages, `${namespace}.${key}`) || key
  );
};
