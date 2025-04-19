import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Team from '@/components/team';
import { mockTeamMember } from './__mocks__/mock-team';
import { GITHUB_LINK } from '@/utils/constants';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/helpers/getTeamMember', () => ({
  getTeamMembers: () => mockTeamMember,
}));

describe('Team component', () => {
  it('renders team members correctly', () => {
    render(<Team />);

    mockTeamMember.forEach(({ name, role, github, mail }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(role)).toBeInTheDocument();

      const links = screen.getAllByRole('link');

      expect(links[0]).toHaveAttribute('href', `${GITHUB_LINK}${github}`);
      expect(links[1]).toHaveAttribute('href', `mailto:${mail}`);
    });
  });
});
