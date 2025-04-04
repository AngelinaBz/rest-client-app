import { TeamMember, TeamMemberKeysType, TeamMemberKeys } from '@/types/team';

export const getTeamMembers = (
  t: (key: TeamMemberKeysType) => string
): TeamMember[] => {
  return [
    {
      name: t(TeamMemberKeys.name1),
      role: t(TeamMemberKeys.role),
      github: 'AngelinaBz',
      mail: 'angelina1337bz@gmail.com',
    },
    {
      name: t(TeamMemberKeys.name2),
      role: t(TeamMemberKeys.role),
      github: 'pambaka',
      mail: 'tanya.pambaka@gmail.com',
    },
    {
      name: t(TeamMemberKeys.name3),
      role: t(TeamMemberKeys.role),
      github: 'hasanozbakir',
      mail: 'hasan.h.ozbakir@gmail.com',
    },
  ];
};
