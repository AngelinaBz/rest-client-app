'use client';

import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Input, Empty } from 'antd';
import { useTranslations } from 'use-intl';
import { VariableType } from '@/types';

const VariablesEditor = () => {
  const t = useTranslations('Variables');

  const [variables, setVariables] = useState<VariableType[]>([]);

  const addVariable = () => {
    setVariables((prev) => [...prev, { key: '', value: '' }]);
  };

  const updateVariable = (index: number, key: string, value: string) => {
    setVariables((prev) =>
      prev.map((variable, i) => (i === index ? { key, value } : variable))
    );
  };

  const deleteVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };

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
