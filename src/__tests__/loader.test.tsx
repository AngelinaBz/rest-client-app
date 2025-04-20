import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from '@/components/loader';
import { describe, expect, it } from 'vitest';

describe('Loader', () => {
  it('renders with default margin', () => {
    const { container } = render(<Loader />);
    const spinElement = container.querySelector('.ant-spin');

    expect(spinElement).toBeInTheDocument();
    expect(spinElement).toHaveStyle({
      display: 'block',
      margin: '5rem auto auto',
    });
  });

  it('renders with custom top margin', () => {
    const { container } = render(<Loader marginTop="2rem" />);
    const spinElement = container.querySelector('.ant-spin');

    expect(spinElement).toHaveStyle({
      margin: '2rem auto auto',
    });
  });
});
