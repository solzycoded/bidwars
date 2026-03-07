import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import * as SellAnItemProviderModule from '../../ContextProviders/SellAnItemProvider.jsx';
import ItemSalePeriodSection from '../../components/SellAnItem/ItemSalePeriod/Section.jsx';

describe('ItemSalePeriod Section', () => {
  const mockSetFormData = jest.fn();
  const initialFormData = {
    salePeriod: { value: '', active: false },
    pause: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(SellAnItemProviderModule, 'useFormDataContext')
      .mockReturnValue({ formData: initialFormData, setFormData: mockSetFormData });
  });

  afterEach(() => {
    if (SellAnItemProviderModule.useFormDataContext.mockRestore) {
      SellAnItemProviderModule.useFormDataContext.mockRestore();
    }
  });

  test('renders numeric input for sale period', () => {
    render(<ItemSalePeriodSection />);
    const input = screen.getByLabelText(/how fast would you like your item to be sold\?/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
    expect(input.value).toBe(initialFormData.salePeriod.value);
  });

  test('changing value calls setFormData with updated salePeriod and pause', () => {
    render(<ItemSalePeriodSection />);
    const input = screen.getByLabelText(/how fast would you like your item to be sold\?/i);

    fireEvent.change(input, { target: { value: '5' } });

    expect(mockSetFormData).toHaveBeenCalled();
    expect(mockSetFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        salePeriod: { value: '5', active: true },
        pause: false,
      })
    );
  });
});