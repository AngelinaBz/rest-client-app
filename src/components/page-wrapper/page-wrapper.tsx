import { Flex } from 'antd';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const FormWrapper = ({ children }: Props) => {
  return (
    <Flex
      vertical
      style={{
        width: '100%',
        maxWidth: '800px',
        minWidth: '360px',
        margin: '0 auto',
      }}
    >
      {children}
    </Flex>
  );
};

export default FormWrapper;
