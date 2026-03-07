import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import * as Provider from '../../../ContextProviders/SellAnItemProvider.jsx';
import SelectCondition from '../../../components/SellAnItem/ItemCondition/Condition.jsx';

// Mock the ConditionOption child so tests are deterministic (use require inside factory)
jest.mock('../../../components/SellAnItem/ItemCondition/ConditionOption.jsx', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ condition }) =>
      React.createElement(React.Fragment, null,
        React.createElement('option', { value: 'excellent' }, 'Excellent'),
        React.createElement('option', { value: 'good' }, 'Good'),
        React.createElement('option', { value: 'fair' }, 'Fair'),
        React.createElement('option', { value: 'poor' }, 'Poor'),
      ),
  };
});

describe('SelectCondition', () => {
  const mockSetFormData = jest.fn();
  const baseFormData = {
    condition: { value: { pre: '', post: '' }, active: false },
    pause: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Provider, 'useFormDataContext').mockReturnValue({
      formData: JSON.parse(JSON.stringify(baseFormData)),
      setFormData: mockSetFormData,
    });
  });

  afterEach(() => {
    if (Provider.useFormDataContext.mockRestore) Provider.useFormDataContext.mockRestore();
  });

  test('renders select with default disabled option and label for pre condition', () => {
    render(<SelectCondition conditionType="pre" />);

    const select = screen.getByLabelText(/select a condition/i);
    expect(select).toBeInTheDocument();

    const defaultOption = screen.getByRole('option', { name: /select a condition/i });
    expect(defaultOption).toBeDisabled();
    expect(defaultOption).toHaveValue('N/A');
    const label = screen.getByText(/In what condition was the item, when you bought it\?/i);
    expect(label).toBeInTheDocument();
  });

  test('selecting an option updates pre condition and calls setFormData with active true and pause false', () => {
    render(<SelectCondition conditionType="pre" />);

    const select = screen.getByLabelText(/select a condition/i);
    fireEvent.change(select, { target: { value: 'good' } });

    expect(mockSetFormData).toHaveBeenCalled();
    const arg = mockSetFormData.mock.calls[mockSetFormData.mock.calls.length - 1][0];
    expect(arg).toEqual(expect.objectContaining({
      condition: expect.objectContaining({
        value: expect.objectContaining({ pre: 'good' }),
        active: true,
      }),
      pause: false,
    }));
  });

  test('selecting an option updates post condition when conditionType is post', () => {
    render(<SelectCondition conditionType="post" />);

    const select = screen.getByLabelText(/select a condition/i);
    fireEvent.change(select, { target: { value: 'fair' } });

    expect(mockSetFormData).toHaveBeenCalled();
    const arg = mockSetFormData.mock.calls[mockSetFormData.mock.calls.length - 1][0];
    expect(arg).toEqual(expect.objectContaining({
      condition: expect.objectContaining({
        value: expect.objectContaining({ post: 'fair' }),
        active: true,
      }),
      pause: false,
    }));

    // label for post should match current-condition text
    expect(screen.getByText(/In what condition would you say the item currently is\?/i)).toBeInTheDocument();
  });
});