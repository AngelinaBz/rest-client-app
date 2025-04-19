'use client';

import { useTranslations } from 'next-intl';
import { Avatar, Card, Col, Row, Tooltip } from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import { TeamMember } from '@/types/team';
import { getTeamMembers } from '@/helpers/getTeamMember';
import styles from './team.module.css';
import { GITHUB_LINK } from '@/utils/constants';

const Team = () => {
  const t = useTranslations('Team');
  const teamMembers: TeamMember[] = getTeamMembers(t);

  return (
    <Row justify="center" gutter={16}>
      {teamMembers.map((member, index) => (
        <Col span={6} key={index}>
          <Tooltip title={member.name}>
            <Card
              className={styles.team}
              hoverable
              actions={[
                <a
                  href={`${GITHUB_LINK}${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key="github"
                >
                  <GithubOutlined />
                </a>,
                <a
                  href={`mailto:${member.mail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key="mailto"
                >
                  <MailOutlined />
                </a>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    size="large"
                    src={`${GITHUB_LINK}${member.github}.png`}
                  />
                }
                title={member.name}
                description={member.role}
              />
            </Card>
          </Tooltip>
        </Col>
      ))}
    </Row>
  );
};

export default Team;
