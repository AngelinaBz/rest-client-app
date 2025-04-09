import { Input } from 'antd';
import { useTranslations } from 'use-intl';

interface URLInputProps {
  url: string;
  setUrl: (url: string) => void;
}

const URLInput = ({ url, setUrl }: URLInputProps): React.JSX.Element => {
  const t = useTranslations('RestfulClient');

  return (
    <Input
      placeholder={t('urlInputPlaceholder')}
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      width={'100%'}
    />
  );
};

export default URLInput;
