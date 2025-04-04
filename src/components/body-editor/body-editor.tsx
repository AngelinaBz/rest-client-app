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
      <Title level={4}>{t('requestBody')}</Title>
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
        onChange={(e) => setBody(e.target.value)}
        placeholder={t('requestBodyPlaceholder')}
      />
    </Flex>
  );
};

export default BodyEditor;
