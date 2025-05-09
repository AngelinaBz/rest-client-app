import { Button } from 'antd';
import { useTranslations } from 'use-intl';

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton = ({ onClick }: SubmitButtonProps): React.JSX.Element => {
  const t = useTranslations('RestfulClient');

  return (
    <Button type="primary" onClick={onClick}>
      {t('send')}
    </Button>
  );
};

export default SubmitButton;
