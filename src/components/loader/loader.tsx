import { Spin, Flex } from 'antd';

const Loader = () => {
  return (
    <Flex justify="center" align="center">
      <Spin size="large" />
    </Flex>
  );
};

export default Loader;
