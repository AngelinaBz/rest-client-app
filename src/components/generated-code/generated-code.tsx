import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Typography, Select, Spin, Flex } from 'antd';
import { fetchGeneratedCode } from '@/utils/fetch-generated-code';
import { RequestParams, LanguageKey, LANGUAGES } from '@/types';
import { useTranslations } from 'next-intl';
import styles from './generated-code.module.css';

const { Paragraph } = Typography;
const { Option } = Select;

const GeneratedCode = ({
  url,
  method,
  headers,
  body,
}: RequestParams): React.JSX.Element => {
  const [language, setLanguage] = useState<LanguageKey>('curl');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const t = useTranslations('RestfulClient');

  useEffect(() => {
    if (!url || !method) {
      return;
    }

    setLoading(true);
    try {
      const snippet = fetchGeneratedCode(
        { url, method, headers, body },
        language
      );
      setCode(snippet);
    } catch {
      setCode(t('codeGenerationFailed'));
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body, language]);

  return (
    <Card title="Generated Code" size="small">
      <Flex align="content-start" gap=".5rem">
        <Select
          value={language}
          onChange={(value) => setLanguage(value)}
          style={{ marginTop: 14, marginBottom: 12, width: 180 }}
        >
          {LANGUAGES.map(({ key, label }) => (
            <Option key={key} value={key}>
              {label}
            </Option>
          ))}
        </Select>

        <Paragraph style={{ flex: 1, borderRadius: '.5rem' }}>
          {loading ? (
            <Spin style={{ display: 'block', margin: '5rem auto auto' }} />
          ) : (
            <pre className={styles['code-block']}>{code}</pre>
          )}
        </Paragraph>
      </Flex>
    </Card>
  );
};

export default GeneratedCode;
