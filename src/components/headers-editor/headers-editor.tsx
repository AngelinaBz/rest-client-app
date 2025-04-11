import { DeleteOutlined } from '@ant-design/icons';
import { Button, Typography, Flex, Tooltip, AutoComplete } from 'antd';
import { useTranslations } from 'use-intl';
import { headersMap } from '@/utils/headers-map-data';
import { HeadersAction } from '@/hooks/use-headers';
import { HeaderType } from '@/types';
import { ActionDispatch } from 'react';

const { Title } = Typography;

type HeadersEditorProps = {
  headers: HeaderType[];
  setHeaders: ActionDispatch<[action: HeadersAction]>;
};
const HeadersEditor = ({
  headers,
  setHeaders,
}: HeadersEditorProps): React.JSX.Element => {
  const t = useTranslations('RestfulClient');

  const fiterOption = (inputValue: string, option?: { value?: string }) => {
    if (!option || !option.value) return false;
    return option.value.toLowerCase().includes(inputValue.toLowerCase());
  };

  const updateHeaders = (index: number, key: string, value: string) =>
    setHeaders({
      type: 'update',
      payload: { index, key, value },
    });

  return (
    <Flex vertical style={{ width: '98%' }} gap="small">
      <Flex align="baseline" justify="space-between">
        <Title level={5} style={{ margin: '0' }}>
          {t('headers')}
        </Title>
        <Button onClick={() => setHeaders({ type: 'add' })} type="dashed">
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
            onChange={(value) => updateHeaders(index, value, header.value)}
            filterOption={(inputValue, option) =>
              fiterOption(inputValue, option)
            }
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
            onChange={(value) => updateHeaders(index, header.key, value)}
            filterOption={fiterOption}
          />
          <Tooltip title={t('deleteHeader')}>
            {headers.length > 1 ? (
              <DeleteOutlined
                onClick={() =>
                  setHeaders({ type: 'remove', payload: { index } })
                }
              />
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
