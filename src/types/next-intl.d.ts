import { routing } from '@/i18n/routing';
import messages from '../../messages/en.json' with { type: 'json' };

export type ValidationKeys = typeof messages.Validation;

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
