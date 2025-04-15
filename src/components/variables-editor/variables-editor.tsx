'use client';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Input, Empty, Form } from 'antd';
import { useTranslations } from 'use-intl';
import useVariablesLocalStorage from '@/hooks/use-variables-localstorage';
import { useCallback } from 'react';

const VariablesEditor = () => {
  const t = useTranslations('Variables');

  const [variables, setVariables] = useVariablesLocalStorage();

  const isKeyUnique = useCallback(
    (key: string, index: number) => {
      if (key.trim() === '') {
        return true;
      }
      return !variables.some(
        (variable, i) => variable.key === key && i !== index
      );
    },
    [variables]
  );

  const updateVariables = useCallback(
    (index: number, key: string, value: string) => {
      setVariables({
        type: 'update',
        payload: { index, key, value },
      });
    },
    [setVariables]
  );

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
        variables.map((variable, index) => {
          const isUnique = isKeyUnique(variable.key, index);

          return (
            <Flex key={index} gap="small">
              <Form.Item
                validateStatus={!isUnique ? 'error' : ''}
                help={!isUnique ? t('keyUniqueError') : ''}
                style={{ marginBottom: 0, flex: 1 }}
              >
                <Input
                  placeholder={t('variableKeyPlaceholder')}
                  value={variable.key}
                  onChange={(e) =>
                    updateVariables(index, e.target.value, variable.value)
                  }
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0, flex: 1 }}>
                <Input
                  placeholder={t('variableValuePlaceholder')}
                  value={variable.value}
                  onChange={(e) =>
                    updateVariables(index, variable.key, e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Tooltip title={t('deleteVariable')}>
                  <DeleteOutlined
                    onClick={() =>
                      setVariables({ type: 'remove', payload: { index } })
                    }
                  />
                </Tooltip>
              </Form.Item>
            </Flex>
          );
        })
      )}
    </Flex>
  );
};

export default VariablesEditor;
