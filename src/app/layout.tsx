import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { RootLayoutProps } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REST Client App',
  description: 'A modern RESTful API client',
  icons: {
    icon: 'icon.png',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <header>Header here</header>
          <main>{children}</main>
          <footer>Footer here</footer>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
