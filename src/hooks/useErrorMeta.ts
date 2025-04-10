import { useTranslations } from 'next-intl';
import { ErrorMeta, StatusType } from '@/types';

export function useErrorMeta(status: StatusType): ErrorMeta {
  const t = useTranslations('ErrorPage');

  return {
    title: t(`${status}.title`),
    subTitle: t(`${status}.subTitle`),
    buttonText:
      status === '404' ? t(`${status}.buttonText`) : t('default.buttonText'),
  };
}
