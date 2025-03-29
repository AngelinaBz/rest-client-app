import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';
import LocaleSwitcher from '@/components/locale-switcher/locale-switcher';

export default function MainPage() {
  const t = useTranslations('MainPage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href={Routes.MAIN}>{t('link')}</Link>
      <LocaleSwitcher />
    </div>
  );
}
