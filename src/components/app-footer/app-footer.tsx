import { GithubOutlined } from '@ant-design/icons';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Link } = Typography;

const AppFooter = (): React.JSX.Element => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Link
        href="https://github.com/AngelinaBz/rest-client-app/issues"
        target="_blank"
      >
        <GithubOutlined style={{ fontSize: 20 }} />
      </Link>{' '}
      | {new Date().getFullYear()} |{' '}
      <Link href="https://rs.school/courses/reactjs" target="_blank">
        <img
          src="https://github.com/rolling-scopes-school/tasks/blob/master/react/assets/rss-logo.svg"
          alt="RS School Logo"
        />
      </Link>
    </Footer>
  );
};

export default AppFooter;
