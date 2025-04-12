import { useTranslations } from 'next-intl';
import { ErrorMeta, Status, StatusType } from '@/types';

export function useErrorMeta(status: StatusType): ErrorMeta {
  const t = useTranslations('ErrorPage');

  return {
    title: t(`${status}.title`),
    subTitle: t(`${status}.subTitle`),
    buttonText:
      status === Status[404]
        ? t(`${status}.buttonText`)
        : t('default.buttonText'),
  };
}
