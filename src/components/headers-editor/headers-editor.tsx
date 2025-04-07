import { DeleteOutlined } from '@ant-design/icons';
import { Button, Typography, Flex, Tooltip, AutoComplete } from 'antd';
import { useTranslations } from 'use-intl';
import type { HeaderType } from '@/types';
import { headersMap } from '@/utils/headers-map-data';

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
    <Flex vertical style={{ width: '98%' }} gap="small">
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
          <AutoComplete
            placeholder={t('headerKeyPlaceholder')}
            value={header.key}
            options={Object.keys(headersMap).map((key) => ({ value: key }))}
            style={{ width: '90%' }}
            onChange={(value) => updateHeader(index, value, header.value)}
            filterOption={(inputValue, option) => {
              if (!option) {
                return false;
              }
              return option.value
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }}
          />
          <AutoComplete
            placeholder={t('headerValuePlaceholder')}
            value={header.value}
            options={
              headersMap[header.key]
                ? headersMap[header.key].map((value) => ({ value }))
                : []
            }
            style={{ width: '90%' }}
            onChange={(value) => updateHeader(index, header.key, value)}
            filterOption={(inputValue, option) => {
              if (!option) {
                return false;
              }
              return option.value
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }}
          />
          <Tooltip title={t('deleteHeader')}>
            {headers.length > 1 ? (
              <DeleteOutlined onClick={() => removeHeader(index)} />
            ) : (
              <DeleteOutlined style={{ opacity: 0.3, pointerEvents: 'none' }} />
            )}
          </Tooltip>
        </Flex>
      ))}
    </Flex>
  );
};

export default HeadersEditor;
