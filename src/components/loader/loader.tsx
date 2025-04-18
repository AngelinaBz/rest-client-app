import { Spin } from 'antd';

type LoaderProps = {
  marginTop?: string;
};

const Loader = ({ marginTop }: LoaderProps) => {
  const style = {
    display: 'block',
    margin: marginTop ? `${marginTop} auto auto` : '5rem auto auto',
  };

  return <Spin style={style} />;
};

export default Loader;
