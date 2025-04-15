import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditorItem } from '@/types';
import VariablesEditor from '@/components/variables-editor';

vi.mock('use-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockSetVariables = vi.fn();
let mockVariables: EditorItem[] = [];

vi.mock('@/hooks/use-variables-localstorage', () => ({
  default: () => [mockVariables, mockSetVariables],
}));

describe('VariablesEditor', () => {
  beforeEach(() => {
    mockVariables = [];
    mockSetVariables.mockClear();
  });

  it('renders Variables Editor component', () => {
    render(<VariablesEditor />);
    expect(screen.getByText('+ addVariable')).toBeInTheDocument();
  });

  it('shows empty message', () => {
    render(<VariablesEditor />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('adds a new variable when the button is clicked', () => {
    render(<VariablesEditor />);
    const addButton = screen.getByText('+ addVariable');
    fireEvent.click(addButton);
    expect(mockSetVariables).toHaveBeenCalledWith({ type: 'add' });
  });

  it('displays variables and changes them', () => {
    mockVariables.push({ key: 'id', value: '1' });
    render(<VariablesEditor />);

    const keyInput = screen.getByDisplayValue('id');
    const valueInput = screen.getByDisplayValue('1');

    fireEvent.change(keyInput, { target: { value: 'name' } });
    fireEvent.change(valueInput, { target: { value: '2' } });

    expect(mockSetVariables).toHaveBeenCalledWith({
      type: 'update',
      payload: { index: 0, key: 'name', value: '1' },
    });

    expect(mockSetVariables).toHaveBeenCalledWith({
      type: 'update',
      payload: { index: 0, key: 'id', value: '2' },
    });
  });

  it('shows error if a key is not unique', () => {
    mockVariables.push({ key: 'id', value: '1' }, { key: 'id', value: '2' });
    render(<VariablesEditor />);
    expect(screen.getAllByText('keyUniqueError').length).toBeGreaterThan(0);
  });

  it('removes a variable when delete icon is clicked', () => {
    mockVariables.push({ key: 'id', value: '1' });
    render(<VariablesEditor />);

    const deleteIcon = screen.getByRole('img');
    fireEvent.click(deleteIcon);

    expect(mockSetVariables).toHaveBeenCalledWith({
      type: 'remove',
      payload: { index: 0 },
    });
  });
});
