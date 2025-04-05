import { Flex, Input, Select, Typography } from 'antd';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

const { TextArea } = Input;
const { Title } = Typography;

type BodyEditorProps = {
  body: string;
  setBody: (value: string) => void;
};

const BodyEditor = ({ body, setBody }: BodyEditorProps) => {
  const [type, setType] = useState('JSON');
  const t = useTranslations('RestfulClient');

  return (
    <Flex vertical gap="small">
      <Title level={5} style={{ margin: '0' }}>
        {t('requestBody')}
      </Title>
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
          rows={6}
          value={body}
          style={{ width: '100%' }}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t('requestBodyPlaceholder')}
        />
      </Flex>
    </Flex>
  );
};

export default BodyEditor;
