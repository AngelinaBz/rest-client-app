import { Card, Flex, Input, Select } from 'antd';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

const { TextArea } = Input;

type BodyEditorProps = {
  body: string;
  setBody: (value: string) => void;
};

const BodyEditor = ({ body, setBody }: BodyEditorProps) => {
  const [type, setType] = useState('JSON');
  const t = useTranslations('RestfulClient');

  return (
    <Card title={t('requestBody')} size="small">
      <Flex align="start" gap={'small'}>
        <Select
          value={type}
          onChange={setType}
          style={{ marginBottom: 10, width: 100 }}
        >
          <Select.Option value="JSON">JSON</Select.Option>
          <Select.Option value="TEXT">{t('plainText')}</Select.Option>
        </Select>
        <TextArea
          rows={5}
          value={body}
          style={{ width: '100%' }}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t('requestBodyPlaceholder')}
        />
      </Flex>
    </Card>
  );
};

export default BodyEditor;
