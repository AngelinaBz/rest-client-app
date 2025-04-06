import { Card, Flex, Select } from 'antd';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useTranslations } from 'use-intl';

type BodyEditorProps = {
  body: string;
  setBody: (value: string) => void;
};

const BodyEditor = ({ body, setBody }: BodyEditorProps) => {
  const [type, setType] = useState('JSON');
  const t = useTranslations('RestfulClient');
  const language = type === 'JSON' ? 'json' : 'plaintext';

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
        <Editor
          height="135px"
          theme="light"
          defaultLanguage={language}
          language={language}
          value={body}
          onChange={(value) => setBody(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </Flex>
    </Card>
  );
};

export default BodyEditor;
