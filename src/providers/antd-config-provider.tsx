import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

type AntdConfigProviderProps = { children: ReactNode };

const AntdConfigProvider = ({ children }: AntdConfigProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1E7497',
          colorTextHeading: '#043857',
          colorLink: '#1E7497',
          colorLinkActive: '#F2843A',
          colorLinkHover: '#EE6B11',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
