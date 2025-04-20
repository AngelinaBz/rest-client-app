import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GeneratedCode from '@/components/generated-code';
import { HttpMethod, LANGUAGES } from '@/types';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      generatedCode: 'Generated Code',
      urlInputPlaceholder: 'Enter URL',
    };
    return translations[key as keyof typeof translations] || key;
  },
}));

vi.mock('@/utils/fetch-generated-code', () => ({
  fetchGeneratedCode: vi
    .fn()
    .mockImplementation(
      async (params, lang) => `${lang} code for ${params.method}`
    ),
}));

describe('GeneratedCode component', () => {
  const defaultProps = {
    url: 'https://api.example.com',
    method: 'GET' as HttpMethod,
    headers: [],
    body: '',
  };

  it('renders initial code snippet', async () => {
    render(<GeneratedCode {...defaultProps} />);

    expect(await screen.findByText(/curl code for GET/)).toBeInTheDocument();
    expect(screen.getByText('Generated Code')).toBeInTheDocument();
  });

  it('changes code when language is changed', async () => {
    render(<GeneratedCode {...defaultProps} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const pythonOption = await screen.findByText('Python');
    fireEvent.click(pythonOption);

    await waitFor(() => {
      expect(screen.getByText(/python code for GET/)).toBeInTheDocument();
    });
  });

  it('does not render anything if method or url is missing', () => {
    const { container } = render(
      <GeneratedCode url="" method="GET" headers={[]} body="" />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(/code for/)).not.toBeInTheDocument();
  });

  it('renders all language options', () => {
    render(<GeneratedCode {...defaultProps} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const dropdown = document.querySelector(
      '.ant-select-dropdown'
    )! as HTMLElement;
    for (const { label } of LANGUAGES) {
      expect(within(dropdown).getByText(label)).toBeInTheDocument();
    }
  });
});
