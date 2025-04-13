'use client';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Input, Empty } from 'antd';
import { useTranslations } from 'use-intl';
import useVariablesLocalStorage from '@/hooks/use-variables-localstorage';

const VariablesEditor = () => {
  const t = useTranslations('Variables');

  const [variables, setVariables] = useVariablesLocalStorage();
  if (!variables || !setVariables) return null;

  const updateVariables = (index: number, key: string, value: string) =>
    setVariables({
      type: 'update',
      payload: { index, key, value },
    });

  return (
    <Flex vertical style={{ padding: '10px' }} gap="small">
      <Flex align="baseline" justify="flex-end">
        <Button onClick={() => setVariables({ type: 'add' })} type="dashed">
          + {t('addVariable')}
        </Button>
      </Flex>

      {variables.length === 0 ? (
        <Empty description={t('message')} />
      ) : (
        variables.map((variable, index) => (
          <Flex key={index} gap="small">
            <Input
              placeholder={t('variableKeyPlaceholder')}
              value={variable.key}
              onChange={(e) =>
                updateVariables(index, e.target.value, variable.value)
              }
            />
            <Input
              placeholder={t('variableValuePlaceholder')}
              value={variable.value}
              onChange={(e) =>
                updateVariables(index, variable.key, e.target.value)
              }
            />
            <Tooltip title={t('deleteVariable')}>
              <DeleteOutlined
                onClick={() =>
                  setVariables({ type: 'remove', payload: { index } })
                }
              />
            </Tooltip>
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default VariablesEditor;
