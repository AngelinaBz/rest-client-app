import ButtonWithAuth from '@/components/button-with-auth';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Button } from 'antd';
import { describe, expect, it, vi } from 'vitest';

const buttonText = 'Button text';
const child = <Button>{buttonText}</Button>;

const isUser = true;
const setIsUser = vi.fn();

vi.mock('@/hooks/use-auth', () => ({
  default: () => ({
    isUser,
    setIsUser,
    checkAuthStatus: () => !isUser,
  }),
}));

describe('Button with auth', () => {
  it('Render children; add onClick event listener to update auth status if it has changed ', async () => {
    render(<ButtonWithAuth>{child}</ButtonWithAuth>);

    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    await waitFor(() => expect(setIsUser).toBeCalledWith(!isUser));
  });
});
