import { render, screen } from '@testing-library/react';
import ResponseViewer from '@/components/response-viewer';
import { describe, it, expect, vi } from 'vitest';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      response: 'Response',
      noResponseYet: 'No response yet.',
      status: 'Status',
      body: 'Body',
      headers: 'Headers',
      noHeaders: 'No headers.',
    };
    return messages[key] ?? key;
  },
}));

describe('ResponseViewer', () => {
  it('renders "No headers." if no headers are present', () => {
    const response = {
      status: 200,
      body: '{"message":"OK"}',
      headers: [],
    };

    render(<ResponseViewer response={response} />);

    expect(screen.getByText(/body/i)).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });
  it('renders parsed JSON body properly', () => {
    const response = {
      status: 200,
      body: '{"foo":"bar"}',
      headers: [],
    };

    render(<ResponseViewer response={response} />);

    expect(screen.getByText(/"foo": "bar"/)).toBeInTheDocument();
  });
});
