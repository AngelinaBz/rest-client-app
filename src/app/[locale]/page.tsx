import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Routes } from '@/types/routes';

export default function MainPage() {
  const t = useTranslations('MainPage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href={Routes.MAIN}>{t('link')}</Link>
    </div>
  );
}
