import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormWrapper } from '@/components/form-wrapper';
import { describe, expect, it } from 'vitest';

describe('FormWrapper', () => {
  it('renders children correctly', () => {
    render(
      <FormWrapper>
        <div>Test content</div>
      </FormWrapper>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
