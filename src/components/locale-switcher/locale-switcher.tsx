'use client';

import { useTransition } from 'react';
import { Locale, useLocale, useTranslations } from 'next-intl';
import { Select } from 'antd';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const options = routing.locales.map((cur) => ({
    value: cur,
    label: t('locale', { locale: cur }),
  }));

  const onSelectChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Select
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
      options={options}
    />
  );
};

export default LocaleSwitcher;
