import { Flex } from 'antd';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const FormWrapper = ({ children }: Props): React.JSX.Element => {
  return (
    <Flex
      style={{
        width: '100%',
        maxWidth: '600px',
        minWidth: '320px',
        borderRadius: '8px',
      }}
    >
      {children}
    </Flex>
  );
};

export default FormWrapper;
