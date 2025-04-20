import { DeleteOutlined } from '@ant-design/icons';
import { Button, Typography, Flex, Tooltip, AutoComplete, Empty } from 'antd';
import { useTranslations } from 'use-intl';
import { headersMap } from '@/utils/headers-map-data';
import { EditorItemAction } from '@/hooks/use-editor-items';
import { EditorItem } from '@/types';
import { ActionDispatch, useEffect } from 'react';
import { updateURLWithHeaders } from '@/utils/update-encoded-headers-params';

const { Title } = Typography;

type HeadersEditorProps = {
  headers: EditorItem[];
  setHeaders: ActionDispatch<[action: EditorItemAction]>;
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

  useEffect(() => {
    updateURLWithHeaders(headers);
  }, [headers]);

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
      {headers.length === 0 ? (
        <Empty description={t('noHeaders')} />
      ) : (
        headers.map((header, index) => (
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
              <DeleteOutlined
                onClick={() =>
                  setHeaders({ type: 'remove', payload: { index } })
                }
              />
            </Tooltip>
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default HeadersEditor;
