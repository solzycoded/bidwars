import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as Provider from '../../../ContextProviders/SellAnItemProvider.jsx';
import SelectTime from '../../../components/SellAnItem/ItemCondition/SelectTime.jsx';

// Mock the child options so tests are deterministic
jest.mock('../../../components/SellAnItem/ItemCondition/SelectTimeOption.jsx', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () =>
      React.createElement(React.Fragment, null,
        React.createElement('option', { value: 'less_than_year' }, 'Less than a year'),
        React.createElement('option', { value: 'one_to_three' }, '1-3 years'),
        React.createElement('option', { value: 'over_three' }, 'Over 3 years')
      ),
  };
});

describe('SelectTime component', () => {
  const mockSetFormData = jest.fn();

  const baseFormData = {
    condition: {
      value: {
        time: {
          purchaseDuration: '',
          acquisitionPeriod: 'N/A',
        },
      },
      active: false,
    },
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

  test('renders duration input and acquisition-period select', () => {
    render(<SelectTime />);

    const input = screen.getByPlaceholderText(/e\.g\.\s*5/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');

    const select = screen.getByLabelText(/Select a time/i);
    expect(select).toBeInTheDocument();

    // initial select default value is "N/A"
    expect(select).toHaveValue('N/A');
  });

  test('typing duration calls setFormData with purchaseDuration and keeps inactive if period is N/A', async () => {
    render(<SelectTime />);

    const input = screen.getByPlaceholderText(/e\.g\.\s*5/i);

    fireEvent.change(input, { target: { value: '5' } });

    await waitFor(() => expect(mockSetFormData).toHaveBeenCalled());

    const lastArg = mockSetFormData.mock.calls[mockSetFormData.mock.calls.length - 1][0];
    expect(lastArg).toEqual(expect.objectContaining({
      condition: expect.objectContaining({
        value: expect.objectContaining({
          time: expect.objectContaining({
            purchaseDuration: '5',
            acquisitionPeriod: 'N/A',
          }),
        }),
        active: false,
      }),
      pause: true,
    }));
  });

  test('selecting a period with existing duration activates condition and unpauses', async () => {
    // render and get rerender helper
    const { rerender } = render(<SelectTime />);

    const input = screen.getByPlaceholderText(/e\.g\.\s*5/i);

    // change the input -> first setFormData call
    fireEvent.change(input, { target: { value: '5' } });
    await waitFor(() => expect(mockSetFormData).toHaveBeenCalled());

    // now update the mocked hook return so the component sees the new controlled value,
    // and re-render so refs/DOM reflect the updated formData
    const updatedFormData = JSON.parse(JSON.stringify(baseFormData));
    updatedFormData.condition.value.time.purchaseDuration = '5';
    Provider.useFormDataContext.mockReturnValue({
      formData: updatedFormData,
      setFormData: mockSetFormData,
    });
    rerender(<SelectTime />);

    // robust selector for the <select> element
    const findSelect = () =>
      screen.queryByRole('combobox') ||
      screen.queryByLabelText(/how long ago you acquired this item/i) ||
      screen.queryByLabelText(/select a time/i) ||
      screen.queryByDisplayValue('N/A');

    const select = findSelect();
    expect(select).toBeInTheDocument();

    // choose one of the mocked option values
    fireEvent.change(select, { target: { value: 'less_than_year' } });
    await waitFor(() => expect(mockSetFormData).toHaveBeenCalledTimes(2));

    const lastArg = mockSetFormData.mock.calls[mockSetFormData.mock.calls.length - 1][0];
    expect(lastArg).toEqual(expect.objectContaining({
      condition: expect.objectContaining({
        value: expect.objectContaining({
          time: expect.objectContaining({
            purchaseDuration: '5',
            acquisitionPeriod: 'less_than_year',
          }),
        }),
        active: true,
      }),
      pause: false,
    }));
  });

  test('selecting a period without duration keeps inactive and paused', async () => {
    render(<SelectTime />);

    const select = screen.getByLabelText(/Select a time/i);
    fireEvent.change(select, { target: { value: 'one_to_three' } });

    await waitFor(() => expect(mockSetFormData).toHaveBeenCalled());

    const lastArg = mockSetFormData.mock.calls[mockSetFormData.mock.calls.length - 1][0];
    expect(lastArg).toEqual(expect.objectContaining({
      condition: expect.objectContaining({
        value: expect.objectContaining({
          time: expect.objectContaining({
            purchaseDuration: '',
            acquisitionPeriod: 'one_to_three',
          }),
        }),
        active: false,
      }),
      pause: true,
    }));
  });
});