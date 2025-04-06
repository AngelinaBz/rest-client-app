'use client';

import { GithubOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Space, Typography } from 'antd';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getTeamMembers } from '@/helpers/getTeamMember';
import styles from './app-footer.module.css';

const { Footer } = Layout;
const { Link } = Typography;

const AppFooter = (): React.JSX.Element => {
  const t = useTranslations('Team');
  const year = new Date().getFullYear().toString();
  const [open, setOpen] = useState(false);
  const teamMembers = getTeamMembers(t);
  const gitHubMenuLinks = teamMembers.map((member, index) => ({
    key: index.toString(),
    label: (
      <a href={member.github} target="_blank" rel="noopener noreferrer">
        {member.name}
      </a>
    ),
  }));

  return (
    <Footer className={styles.footer}>
      <Space className={styles['footer-container']} size="large" align="center">
        <Dropdown
          menu={{ items: gitHubMenuLinks }}
          trigger={['hover']}
          open={open}
          onOpenChange={setOpen}
        >
          <GithubOutlined className={styles['footer-logo']} alt="GitHub logo" />
        </Dropdown>

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
