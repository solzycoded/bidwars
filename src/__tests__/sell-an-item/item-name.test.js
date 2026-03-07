import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useFormDataContext } from '../../ContextProviders/SellAnItemProvider.jsx';
import ItemNameSection from '../../components/SellAnItem/ItemName/Section.jsx';

// mock the provider hook used by the component
jest.mock('../../ContextProviders/SellAnItemProvider.jsx', () => ({
  useFormDataContext: jest.fn(),
}));


describe('ItemName Section', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // helper: try several queries to find the title input
  const findTitleInput = async () => {
    const byLabel = screen.queryByLabelText(/item name|title|name/i);
    if (byLabel) return byLabel;

    const byPlaceholder = screen.queryByPlaceholderText(/item name|title|name/i);
    if (byPlaceholder) return byPlaceholder;

    const byRole = screen.queryByRole('textbox');
    if (byRole) return byRole;

    return null;
  };

  test('renders item name input', async () => {
    // arrange: provide mocked hook return value
    useFormDataContext.mockReturnValue({
      formData: { title: { value: '', active: false } },
      setFormData: jest.fn(),
    });

    render(<ItemNameSection />);
    const input = await waitFor(() => findTitleInput());
    expect(input).toBeInTheDocument();
  });

  test('typing into item name updates the input and calls setFormData', async () => {
    const externalCalls = [];
    // TestWrapper keeps a local formData state and registers it on the mocked hook
    function TestWrapper() {
      const [formDataState, setFormDataState] = React.useState({
        title: { value: '', active: false },
      });

      // proxy setFormData that both records calls and updates local state
      const proxySetFormData = (payload) => {
        externalCalls.push(payload);
        if (typeof payload === 'function') {
          setFormDataState((prev) => payload(prev));
        } else {
          setFormDataState((prev) => ({ ...prev, ...(payload || {}) }));
        }
      };

      // IMPORTANT: set the mocked hook return synchronously so child components
      // calling the hook during render receive the current values.
      useFormDataContext.mockReturnValue({
        formData: formDataState,
        setFormData: proxySetFormData,
      });

      return <ItemNameSection />;
    }

    render(<TestWrapper />);

    const input = await waitFor(() => findTitleInput());
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'My Test Item' } });

    // DOM should update because TestWrapper applies the change to local state
    expect(input.value).toBe('My Test Item');

    // ensure the mocked setFormData was invoked (we recorded calls)
    expect(externalCalls.length).toBeGreaterThan(0);

    // inspect last call payload (function or object)
    const last = externalCalls[externalCalls.length - 1];
    if (typeof last === 'function') {
      const result = last({ title: { value: '', active: false } });
      expect(result.title.value).toBe('My Test Item');
    } else if (last && last.title) {
      expect(last.title.value).toBe('My Test Item');
    }
  });
});