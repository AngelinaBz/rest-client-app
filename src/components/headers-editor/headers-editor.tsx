import { DeleteOutlined } from '@ant-design/icons';
import { Input, Button, Typography, Flex, Tooltip } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'use-intl';

const { Title } = Typography;

type Header = {
  key: string;
  value: string;
};

type HeadersEditorProps = {
  headers: Header[];
  setHeaders: Dispatch<SetStateAction<Header[]>>;
};

const HeadersEditor = ({ headers, setHeaders }: HeadersEditorProps) => {
  const t = useTranslations('RestfulClient');

  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, idx) => idx !== index);
    setHeaders(newHeaders);
  };

  return (
    <Flex vertical gap="small">
      <Flex align="baseline" justify="space-between">
        <Title level={5} style={{ margin: '0' }}>
          {t('headers')}
        </Title>
        <Button onClick={addHeader} type="dashed">
          + {t('addHeader')}
        </Button>
      </Flex>
      {headers.map((header, index) => (
        <Flex key={index} gap="small">
          <Input
            placeholder={t('headerKeyPlaceholder')}
            value={header.key}
            onChange={(e) => updateHeader(index, e.target.value, header.value)}
          />
          <Input
            placeholder={t('headerValuePlaceholder')}
            value={header.value}
            onChange={(e) => updateHeader(index, header.key, e.target.value)}
          />
          {headers.length > 1 && (
            <Tooltip title={t('deleteHeader')}>
              <DeleteOutlined onClick={() => removeHeader(index)} />
            </Tooltip>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default HeadersEditor;
