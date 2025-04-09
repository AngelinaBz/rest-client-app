import { Card, Typography } from 'antd';
import { fetchGeneratedCode } from '@/utils/fetch-generated-code';
import { RequestParams } from '@/types';
import styles from './generated-code.module.css';

const { Paragraph } = Typography;

const GeneratedCode = ({
  method,
  url,
  headers,
  body,
}: RequestParams): React.JSX.Element => {
  const code = fetchGeneratedCode({ method, url, headers, body });

  return (
    <Card title="Generated Code" size="small">
      <Paragraph>
        <pre className={styles['code-block']}>{code}</pre>
      </Paragraph>
    </Card>
  );
};

export default GeneratedCode;
