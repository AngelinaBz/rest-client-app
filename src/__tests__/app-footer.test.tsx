import { AppFooter } from '@/components/app-footer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { getTeamMembers } from '@/helpers/getTeamMember';
import { GITHUB_LINK } from '@/utils/constants';
import messages from '@/../messages/en.json';

const locale: Locale = 'en';
const developersNum = getTeamMembers(vi.fn()).length;
const year = new Date().getFullYear().toString();

describe('App Footer', () => {
  it('Render github links (on hover), year, RSS logo', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppFooter />
      </NextIntlClientProvider>
    );

    const githubIcon = screen.getAllByRole('img')[0];
    fireEvent.mouseOver(githubIcon);
    await waitFor(() => {
      const links: HTMLAnchorElement[] = screen.getAllByRole('link');
      const developerLinks = links.filter((link) =>
        link.href.includes(GITHUB_LINK)
      );
      expect(developerLinks.length).toBe(developersNum);
    });

    const footerYear = screen.getByText(year);
    expect(footerYear).toBeInTheDocument();

    const rssLogo = screen.getByAltText(messages.Footer.rssLogo);
    expect(rssLogo).toBeInTheDocument();
  });
});
