export type TeamMember = {
  name: string;
  role: string;
  github: string;
  mail: string;
};

export const TeamMemberKeys = {
  name1: 'name1',
  name2: 'name2',
  name3: 'name3',
  role: 'role',
} as const;

export type TeamMemberKeysType = keyof typeof TeamMemberKeys;
