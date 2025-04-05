import { Button } from 'antd';
import { useTranslations } from 'use-intl';

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  const t = useTranslations('RestfulClient');

  return (
    <Button type="primary" onClick={onClick}>
      {t('sendRequest')}
    </Button>
  );
};

export default SubmitButton;
