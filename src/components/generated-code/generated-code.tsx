import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Typography, Select, Flex } from 'antd';
import { fetchGeneratedCode } from '@/utils/fetch-generated-code';
import { RequestParams, LanguageKey, LANGUAGES } from '@/types';
import { useTranslations } from 'next-intl';
import { Loader } from '../loader';
import { getVariablesAsMapFromCookiesClient } from '@/utils/get-variables-map';
import { replaceVariables } from '@/utils/prepare-request';
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
    if (!url || !method) return;

    const variableMap = getVariablesAsMapFromCookiesClient();

    const replacedUrl = replaceVariables(url, variableMap);
    const replacedHeaders = headers.map((h) => ({
      key: replaceVariables(h.key, variableMap),
      value: replaceVariables(h.value, variableMap),
    }));
    const replacedBody = body ? replaceVariables(body, variableMap) : '';

    setLoading(true);
    try {
      fetchGeneratedCode(
        {
          url: replacedUrl,
          method,
          headers: replacedHeaders,
          body: replacedBody,
        },
        language
      )
        .then((snippet) => setCode(snippet))
        .catch(() => setCode(t('codeGenerationFailed')));
    } catch {
      setCode(t('codeGenerationFailed'));
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body, language]);

  return (
    <Card title={t('generatedCode')} size="small">
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
            <Loader />
          ) : (
            <pre className={styles['code-block']}>{code}</pre>
          )}
        </Paragraph>
      </Flex>
    </Card>
  );
};

export default GeneratedCode;
