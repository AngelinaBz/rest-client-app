'use client';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Input, Empty } from 'antd';
import { useTranslations } from 'use-intl';
import { useObjectList } from '@/hooks/use-oblect-list';

const VariablesEditor = () => {
  const t = useTranslations('Variables');

  const {
    list: variables,
    addItem: addVariable,
    updateItem: updateVariable,
    removeItem: deleteVariable,
  } = useObjectList([]);

  return (
    <Flex vertical style={{ padding: '10px' }} gap="small">
      <Flex align="baseline" justify="flex-end">
        <Button onClick={addVariable} type="dashed">
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
                updateVariable(index, e.target.value, variable.value)
              }
            />
            <Input
              placeholder={t('variableValuePlaceholder')}
              value={variable.value}
              onChange={(e) =>
                updateVariable(index, e.target.value, variable.key)
              }
            />
            <Tooltip title={t('deleteVariable')}>
              <DeleteOutlined onClick={() => deleteVariable(index)} />
            </Tooltip>
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default VariablesEditor;
