'use client';

import { useTranslations } from 'next-intl';
import { Avatar, Card, Col, Row } from 'antd';
import { UserOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { TeamMember } from '@/types';

const Team = () => {
  const t = useTranslations('Team');
  const teamMembers: TeamMember[] = [
    {
      name: t('teamMember1Name'),
      role: t('teamMemberRole'),
      github: 'https://github.com/AngelinaBz',
      mail: 'angelina1337bz@gmail.com',
    },
    {
      name: t('teamMember2Name'),
      role: t('teamMemberRole'),
      github: 'https://github.com/pambaka',
      mail: 'tanya.pambaka@gmail.com',
    },
    {
      name: t('teamMember3Name'),
      role: t('teamMemberRole'),
      github: 'https://github.com/hasanozbakir',
      mail: 'hasan.h.ozbakir@gmail.com',
    },
  ];

  return (
    <Row justify="center" gutter={16}>
      {teamMembers.map((member, index) => (
        <Col span={6} key={index}>
          <Card
            hoverable
            actions={[
              <a
                href={member.github}
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
              avatar={<Avatar size="large" icon={<UserOutlined />} />}
              title={member.name}
              description={member.role}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Team;
