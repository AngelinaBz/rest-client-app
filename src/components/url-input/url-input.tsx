import { updateEncodedUrlInPath } from '@/utils/update-encoded-url-path';
import { Input } from 'antd';
import { useTranslations } from 'use-intl';

interface URLInputProps {
  url: string;
  setUrl: (url: string) => void;
}

const URLInput = ({ url, setUrl }: URLInputProps): React.JSX.Element => {
  const t = useTranslations('RestfulClient');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    updateEncodedUrlInPath(newUrl);
  };

  return (
    <Input
      placeholder={t('urlInputPlaceholder')}
      value={url}
      onChange={handleChange}
      width={'100%'}
    />
  );
};

export default URLInput;
