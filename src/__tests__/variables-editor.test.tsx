import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditorItem } from '@/types';
import VariablesEditor from '@/components/variables-editor';
import { mockVariablesData } from './__mocks__/mock-variables';
import messages from '@/../messages/en.json';

const variablesMessages = messages.Variables;

vi.mock('use-intl', () => ({
  useTranslations: () => (key: keyof typeof variablesMessages) =>
    variablesMessages[key],
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
    expect(
      screen.getByText(`+ ${variablesMessages.addVariable}`)
    ).toBeInTheDocument();
  });

  it('shows empty message', () => {
    render(<VariablesEditor />);
    expect(screen.getByText(variablesMessages.message)).toBeInTheDocument();
  });

  it('adds a new variable when the button is clicked', () => {
    render(<VariablesEditor />);
    const addButton = screen.getByText(`+ ${variablesMessages.addVariable}`);
    fireEvent.click(addButton);
    expect(mockSetVariables).toHaveBeenCalledWith({ type: 'add' });
  });

  it('displays variables and changes them', () => {
    mockVariables.push(mockVariablesData[0]);
    render(<VariablesEditor />);

    const keyInput = screen.getByDisplayValue(mockVariablesData[0].key);
    const valueInput = screen.getByDisplayValue(mockVariablesData[0].value);

    fireEvent.change(keyInput, { target: { value: 'name' } });
    fireEvent.change(valueInput, { target: { value: '2' } });

    expect(mockSetVariables).toHaveBeenCalledWith({
      type: 'update',
      payload: { index: 0, ...mockVariablesData[0], key: 'name' },
    });

    expect(mockSetVariables).toHaveBeenCalledWith({
      type: 'update',
      payload: { index: 0, ...mockVariablesData[0], value: '2' },
    });
  });

  it('shows error if a key is not unique', () => {
    mockVariables.push(...mockVariablesData);
    render(<VariablesEditor />);
    expect(
      screen.getAllByText(variablesMessages.keyUniqueError).length
    ).toBeGreaterThan(0);
  });

  it('removes a variable when delete icon is clicked', () => {
    mockVariables.push(mockVariablesData[0]);
    render(<VariablesEditor />);

    const deleteIcon = screen.getByRole('img');
    fireEvent.click(deleteIcon);

    expect(mockSetVariables).toHaveBeenCalledWith({
      type: 'remove',
      payload: { index: 0 },
    });
  });
});
