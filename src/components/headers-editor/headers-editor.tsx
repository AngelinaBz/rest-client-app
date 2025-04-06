import { DeleteOutlined } from '@ant-design/icons';
import { Input, Button, Typography, Flex, Tooltip } from 'antd';
import { useTranslations } from 'use-intl';
import type { HeaderType } from '@/types';

const { Title } = Typography;

type HeadersEditorProps = {
  headers: HeaderType[];
  addHeader: () => void;
  updateHeader: (index: number, key: string, value: string) => void;
  removeHeader: (index: number) => void;
};

const HeadersEditor = ({
  headers,
  addHeader,
  updateHeader,
  removeHeader,
}: HeadersEditorProps) => {
  const t = useTranslations('RestfulClient');

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
