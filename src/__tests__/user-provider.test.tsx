import UserProvider from '@/providers/user-provider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, Mock, vi } from 'vitest';
import messages from '@/../messages/en.json';
import useAuth from '@/hooks/use-auth';

const locale: Locale = 'en';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ isUser: false, message: '' }),
  })
) as Mock;

vi.mock('@/hooks/use-auth', () => ({
  default: () => ({
    isUser: false,
    setIsUser: vi.fn(),
  }),
}));

const buttonText = 'Sign In';
const TestComponent = () => {
  const { setIsUser } = useAuth();
  return <button onClick={() => setIsUser(true)}>{buttonText}</button>;
};

const spy = vi.spyOn(globalThis, 'setTimeout');

describe('User provider', () => {
  it('Set timeout when user signs in', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <UserProvider>
          <TestComponent />
        </UserProvider>
      </NextIntlClientProvider>
    );

    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();

    expect(spy).not.toBeCalled();
    fireEvent.click(button);
    await waitFor(() => expect(spy).toHaveBeenCalledOnce());
  });
});
