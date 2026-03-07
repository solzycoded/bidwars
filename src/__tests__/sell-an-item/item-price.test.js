// mock the provider module before importing so the hook is a proper mock
jest.mock('../../ContextProviders/SellAnItemProvider.jsx', () => ({
  useFormDataContext: jest.fn(),
}));

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFormDataContext } from '../../ContextProviders/SellAnItemProvider.jsx';
import ItemPriceSection from '../../components/SellAnItem/ItemPrice/Section.jsx';

describe('ItemPrice Section', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // helper: try several queries to find the price input (number inputs are spinbutton)
  const findPriceInput = async () => {
    const bySpin = screen.queryByRole('spinbutton');
    if (bySpin) return bySpin;

    const byLabel = screen.queryByLabelText(/item price|price/i);
    if (byLabel) return byLabel;

    const byPlaceholder = screen.queryByPlaceholderText(/item price|price/i);
    if (byPlaceholder) return byPlaceholder;

    const byTextbox = screen.queryByRole('textbox');
    if (byTextbox) return byTextbox;

    return null;
  };

  test('renders item price input', async () => {
    useFormDataContext.mockReturnValue({
      formData: { price: { value: '', active: false } },
      setFormData: jest.fn(),
    });

    render(<ItemPriceSection />);
    const input = await waitFor(() => findPriceInput());
    expect(input).toBeInTheDocument();
  });

  test('typing into item price updates the input and calls setFormData', async () => {
    const externalCalls = [];
    function TestWrapper() {
      const [formDataState, setFormDataState] = React.useState({
        price: { value: '', active: false },
      });

      const proxySetFormData = (payload) => {
        externalCalls.push(payload);
        if (typeof payload === 'function') {
          setFormDataState((prev) => payload(prev));
        } else {
          setFormDataState((prev) => ({ ...prev, ...(payload || {}) }));
        }
      };

      // ensure the mocked hook returns the current state synchronously
      useFormDataContext.mockReturnValue({
        formData: formDataState,
        setFormData: proxySetFormData,
      });

      return <ItemPriceSection />;
    }

    render(<TestWrapper />);

    const input = await waitFor(() => findPriceInput());
    expect(input).toBeInTheDocument();

    // use a numeric value because the component renders a number input
    fireEvent.change(input, { target: { value: '123' } });

    // DOM should update because TestWrapper applies the change to local state
    expect(input.value).toBe('123');

    // ensure the mocked setFormData was invoked (we recorded calls)
    expect(externalCalls.length).toBeGreaterThan(0);

    const last = externalCalls[externalCalls.length - 1];
    if (typeof last === 'function') {
      const result = last({ price: { value: '', active: false } });
      expect(result.price.value).toBe('123');
    } else if (last && last.price) {
      expect(last.price.value).toBe('123');
    }
  });
});