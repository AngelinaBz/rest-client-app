'use client';

import { GithubOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import styles from './app-footer.module.css';

const { Footer } = Layout;
const { Link } = Typography;

const AppFooter = (): React.JSX.Element => {
  const year = new Date().getFullYear().toString();

  return (
    <Footer className={styles.footer}>
      <Space className={styles['footer-container']} size="large" align="center">
        <Link
          className={styles['footer-link']}
          href="https://github.com/AngelinaBz/rest-client-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined className={styles['footer-logo']} alt="GitHub logo" />
        </Link>

        <span>|</span>

        <time dateTime={year}>{year}</time>

        <span>|</span>

        <Link
          className={styles['footer-link']}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles['footer-logo']}
            src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/react/assets/rss-logo.svg"
            alt="RS School Logo"
          />
        </Link>
      </Space>
    </Footer>
  );
};

export default AppFooter;
