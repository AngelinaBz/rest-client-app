import { ChildrenProps } from '@/types';
import { ConfigProvider, ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  token: {
    fontFamily: 'Inter',
    colorPrimary: '#1E7497',
    colorPrimaryBg: '#DEEBEE',
    colorTextHeading: '#043857',
    colorLink: '#1E7497',
    colorLinkActive: '#F2843A',
    colorLinkHover: '#EE6B11',
  },
};

const AntdConfigProvider = ({ children }: ChildrenProps) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};

export default AntdConfigProvider;
