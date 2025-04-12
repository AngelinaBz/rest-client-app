import { FormWrapper } from '@/components/form-wrapper';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const text = 'Some text';

describe('Form wrapper test', () => {
  it('Render passed children', () => {
    render(
      <FormWrapper>
        <div>{text}</div>
      </FormWrapper>
    );

    const textElement = screen.getByText(text);
    expect(textElement).toBeInTheDocument();
  });
});
